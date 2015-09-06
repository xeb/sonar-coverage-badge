# Sonar Coverage Badge

<a href="https://travis-ci.org/xeb/sonar-coverage-badge">
<img src="https://api.travis-ci.org/xeb/sonar-coverage-badge.svg?branch=master" />
</a><a href="http://sonar.epicapp.com/dashboard/index/1">
<img src="http://sonarcovbadge.epicapp.com/?server=sonar.epicapp.com&resource=sonar-coverage-badge&amp;metrics=coverage" />
</a>

This is a small node.js server that will generate a coverage badge (similar to: http://coveralls.io/) but from a <a href="http://sonarqube.org">SonarQube</a> server.

This is yet-another-small exploratory project I was playing with.

# TODO

```
Update: The HTTPS versions also get proxied now. Assets must include Cache-Control: no-cache and ETag headers. If a badge is not updating, then it means they are not properly setting these headers. See my comment below for more info.

https://github.com/github/markup/issues/224

```

I need to return these headers

# Usage

```node sample-coverage-badge.js --port=8087```

Then simply specify three parameters:
<li> *server* - Hostname of the target SonarQube server</li>
<li> *resource* - the key as defined by http://{SONAR}/api/projects </li>
<li> *metrics* - usually either 'coverage' or 'branch_coverage' </li>

Example:
*http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage*

Will display:

<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.php:parent&metrics=coverage" />


# Color Settings
To adjust the badge colors, simply update the ```colorSettings``` var at the beginning of the script.  Note that it will be evaluated in order.


# Samples

## JUnit

<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage" />
</a>

```
<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage" />
</a>
```

## Python

<a href="http://nemo.sonarqube.org/drilldown/measures/690819?metric=coverage">
	<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.python:python&metrics=coverage" />
</a>

```
<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.python:python&metrics=coverage" />
</a>
```
