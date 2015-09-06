# use the tools as dev dependencies rather than installing them globaly
# it lets you handle specific versions of the tooling for each of your projects
MOCHA=node_modules/.bin/mocha
ISTANBUL=node_modules/.bin/istanbul
JSHINT=node_modules/.bin/jshint

# test files must end with ".test.js"
TESTS=$(shell find test/ -name "*.test.js")

all: clean test realtest

clean:
	rm -rf reports

test:
	$(MOCHA) -R spec $(TESTS)

realtest:
	node src/index.js &
	sleep 2
	curl -vvv "http://127.0.0.1:8087/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.php:parent&metrics=coverage"
	echo $?
	pkill node

coverage:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports

	@# make a copy of all src and tests since we will want to instrument our code
	@test -d cov-wip || mkdir cov-wip
	cp -r test cov-wip/test
	cp -r src cov-wip/src

	$(ISTANBUL) instrument --output cov-wip/src-cov cov-wip/src
	rm -rf cov-wip/src
	mv cov-wip/src-cov cov-wip/src

	@# tell istanbul to only generate the lcov file
	ISTANBUL_REPORTERS=lcovonly $(MOCHA) -R mocha-istanbul $(shell find cov-wip/test/ -name "*.test.js")

	@# place the lcov report in the report folder, remove instrumented code
	@# and reput src at its place
	mv lcov.info reports/coverage.lcov

	@# clean up the coverage work in progress folder
	rm -rf cov-wip

jshint:
	$(JSHINT) src test --show-non-errors

sonar:
	@# add the sonar sonar-runner executable to the PATH
	sonar-runner -e -X

.PHONY: clean test coverage jshint sonar all
