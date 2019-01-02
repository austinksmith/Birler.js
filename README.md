# Birler.js

**Author**: Austin K. Smith

**Website**: [Github](https://github.com/austinksmith/Birler.js)

**Description**: 100% Vanilla Javascript Searchable Logging System

**License**: Artistic License 2.0

# About

A useful isomorphic searchable logging system, saves results in memory for later lookup. Originally written for use with [Hamsters.js](http://www.hamsters.io) now moved into it's own package for reusability. 


# Install

  * Add Birler.js to your project using the instructions below

  ## HTML

  * Download a copy of the library and add it to your webserver public directory
  * Add script tag to your html page

  ```html
	<!-- HTML4 and (x)HTML -->
	<script type="text/javascript" src="path/to/birler.web.min.js">

	<!-- HTML5 -->
	<script src="path/to/birler.web.min.js"></script>
  ```

  ## Node

  * Use npm install to add the project to your dependencies `npm install --save birler`
  * Require the npm module in your app.js file

  ```js
 	  var birler = require('birler.js');
  ```

  ## Once you've installed Birler.js you should now be able to run the following methods.

  * INFO - Creates and saves info log event to log book with timestamp

  ```js
    birler.info('New information log'); -> `Birler.js v1.0.0 INFO: New information log @ 198204829382`
  ```
  
  * ERROR - Creates and saves error log event to log book with timestamp
  
  ```js
    birler.error('New error log'); -> `Birler.js v1.0.0 ERROR: New error log @ 198204829382`
  ```

  * WARNING - Creates and warning info log event to log book with timestamp

  ```js
    birler.warning('New warning log'); -> `Birler.js v1.0.0 WARNING: New warning log @ 198204829382`
  ```
  * getLogEntries - Returns logbook object containing all saved log entries

  ```js
    birler.getLogEntries(); -> {info: [], warning: [], error: []}
  ```
  * searchLogEntries - Searches saved log entries for search string, eventType optional
  
  ```js
    birler.searchLogEntries(searchString, eventType);
  ```



