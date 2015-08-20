# Sonar Coverage Badge

This is a small node.js server that will generate a coverage badge (similar to: http://coveralls.io/) but from a <a href="http://sonarqube.org">SonarQube</a> server.

This is yet-another-small exploratory project I was playing with.


# Usage

```node sample-coverage-badge.js --port=8087```

Then simply specify three parameters:
<li> *server* - Hostname of the target SonarQube server</li>
<li> *resource* - the key as defined by http://{SONAR}/api/projects </li>
<li> *metrics* - usually either 'coverage' or 'branch_coverage' </li>

Example:
*http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage*

Will display:

<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.php:parent&metrics=coverage" />


# Color Settings
To adjust the badge colors, simply update the ```colorSettings``` var at the beginning of the script.  Note that it will be evaluated in order.


# Samples

## JUnit

<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage" />
</a>

```
<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage" />
</a>
```

## Python

<a href="http://nemo.sonarqube.org/drilldown/measures/690819?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.python:python&metrics=coverage" />
</a>

```
<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.python:python&metrics=coverage" />
</a>
```

