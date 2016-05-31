# Sonar Coverage Badge

<a href="https://travis-ci.org/xeb/sonar-coverage-badge">
<img src="https://api.travis-ci.org/xeb/sonar-coverage-badge.svg?branch=master" />
</a><a href="http://sonar.epicapp.com/dashboard/index/1">
<img src="http://sonarcovbadge.epicapp.com/?server=sonar.epicapp.com&resource=sonar-coverage-badge&metrics=coverage&2=4" />
</a>

This is a small node.js server that will generate a coverage badge (similar to: http://coveralls.io/) but from a <a href="http://sonarqube.org">SonarQube</a> server.

# Usage

```node src\\index.js --port=8087```
or
```npm start```

Then simply specify three parameters:
<li> *server* - Hostname of the target SonarQube server</li>
<li> *resource* - the key as defined by http://{SONAR}/api/projects </li>
<li> *metrics* - usually either 'coverage' or 'branch_coverage' </li>

Example:
*http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage&ssl=true*

Will display:

<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=org.sonarsource.php:php&metrics=coverage&ssl=true" />

# Note about SSL
There is a quick way to turn on SSL queries if your SonarQube server requires SSL.  
Just add ```ssl=true``` to the end of the query string.  
All of the examples in this README referencing Nemo.sonarqube.org have SSL enabled.

# Color Settings
To adjust the badge colors, simply update the ```colorSettings``` var at the beginning of the script.  Note that it will be evaluated in order.


# Samples

## JUnit

<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage&ssl=true" />
</a>

```
<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://localhost:8087/?server=nemo.sonarqube.org&resource=junit:junit&metrics=coverage&ssl=true" />
</a>
```

## Python

<a href="http://nemo.sonarqube.org/drilldown/measures/690819?metric=coverage">
	<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.python:python&metrics=coverage&ssl=true" />
</a>

```
<a href="http://nemo.sonarqube.org/drilldown/measures/252031?metric=coverage">
	<img src="http://sonarcovbadge.epicapp.com/?server=nemo.sonarqube.org&resource=org.codehaus.sonar-plugins.python:python&metrics=coverage&ssl=true" />
</a>
```
