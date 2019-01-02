/* jshint esversion: 6, curly: true, eqeqeq: true, forin: true */

/***********************************************************************************
* Title: Birler.js                                                                 *
* Description: 100% Vanilla Javascript Searchable Logging System                   *
* Author: Austin K. Smith                                                          *
* Contact: austin@asmithdev.com                                                    *  
* Copyright: 2015 Austin K. Smith - austin@asmithdev.com                           * 
* License: Artistic License 2.0                                                    *
***********************************************************************************/

'use strict';

class birlerLogger {

  /**
  * @constructor
  * @function constructor - Sets properties for this class
  */
  constructor() {
    this.version = '1.0.0',
    this.logBook = {
      error: [],
      warning: [],
      info: []
    };
    this.info = this.infoLog;
    this.warning = this.warningLog;
    this.error = this.errorLog;
    this.saveLogEntry = this.saveToLogBook;
    this.getLogEntries = this.fetchLogBook;
    this.createAndSaveStampedMessage = this.generateTimeStampedMessage;
    this.searchLogEntries = this.searchLogBook;
  }

  /**
  * @function infoLog - Creates and saves info log event to log book with timestamp
  * @param {string} message - Logged info event message
  * @return {string} timeStampedMessage- Timestamped info log event record
  */
  infoLog(message) {
    let timeStampedMessage = this.createAndSaveStampedMessage('Info', message);
    console.info(timeStampedMessage);
    return timeStampedMessage;
  }

  /**
  * @function warningLog - Creates and saves warning log event to log book with timestamp
  * @param {string} message - Logged warning event message
  * @return {string} timeStampedMessage- Timestamped warning log event record
  */
  warningLog(message) {
    let timeStampedMessage = this.createAndSaveStampedMessage('Warning', message);
    console.warn(timeStampedMessage);
    return timeStampedMessage;
  }

  /**
  * @function errorLog - Creates and saves error log event to log book with timestamp
  * @param {string} message - Logged error event message
  * @param {function} reject - Optional callback function to invoke promise rejection
  * @return {string} timeStampedMessage- Timestamped error log event record
  */
  errorLog(message, reject) {
    let timeStampedMessage = this.createAndSaveStampedMessage('Error', message);
    console.error(timeStampedMessage);
    if(reject) {
      return reject(timeStampedMessage);
    }
    return timeStampedMessage;
  }

  /**
  * @function generateTimeStampedMessage - Creates and saves log event to log book with timestamp
  * @param {string} type - Specific eventType (warning, info, error)
  * @param {string} message - Logged event message
  * @return {string} record - Timestamped log event record
  */
  generateTimeStampedMessage(eventType, message) {
    let record = `Birler.js v${this.version} ${eventType}: ${message} @ ${Date.now()}`
    this.saveLogEntry(type.toLowerCase(), record);
    return record;
  }

  /**
  * @function saveToLogBook - Saves log event to log book
  * @param {string} eventType - Specific eventType to save to, (warning, info, error)
  * @param {string} message - Logged event message
  */
  saveToLogBook(eventType, message) {
    this.logBook[eventType].push(message);
  }

  /**
  * @function fetchLogBook - Returns saved log entries
  * @param {string} eventType - Optional event type (info, warning, error)
  * @return {array} logBook - Returns saved log entries
  */
  fetchLogBook(eventType) {
    if(eventType) {
      return this.logBook[eventType];
    }
    return this.logBook;
  }

  /**
  * @function findStringInLogBook - Searches a specific saved log entries category (ie. info) for search string
  * @param {array} logBookEntries - Array of log entries (ie. info log array)
  * @param {string} searchstring - Search string to look for in logBookEntries
  * @return {array} searchResults - Array of results matching searchString
  */
  findStringInLogBook(logBookEntries, searchString) {
    let searchResults = [];
    let i = 0;
    for (i; i < logBookEntries.length; i++) {
      if(logBookEntries[i].indexOf(searchString) !== -1) {
        searchResults.push(logBookEntries[i]);
      }
    }
    return searchResults;
  }

  /**
  * @function findStringInLogBookAllTypes - Searches all saved log entries for search string
  * @param {object} logBook - Saved log entries
  * @param {string} searchstring - Search string to look for in logBook
  * @return {array} searchResults - Array of results matching searchString
  */
  findStringInLogBookAllTypes(logBook, searchString) {
    let searchResults = [];
    let key, eventTypeResults, tmpEntries = null;
    for(key in logBook) {
      if(logBook.hasOwnProperty(key)) {
        tmpEntries = logBook[key];
        eventTypeResults = this.findStringInLogBook(tmpEntries, searchString);
        for (var i = eventTypeResults.length - 1; i >= 0; i--) {
          searchResults.push(eventTypeResults[i])
        }
      }
    }
    return searchResults;
  }

  /**
  * @function searchLogBook - Searches saved log entries for search string
  * @param {string} searchstring - Search string to look for in logBook
  * @param {string} eventType - Specific event type to search within (warning, error, info)
  * @return {object} - Search results object
  */
  searchLogBook(searchString, eventType) {
    let finalResults = [];
    if(eventType) {
      finalResults = this.findStringInLogBook(this.logBook[eventType], searchString);
    } else {
      finalResults = this.findStringInLogBookAllTypes(this.logBook, searchString);
    }
    return {
      total: finalResults.length,
      results: finalResults
    };
  }   
}

var birler = new birlerLogger();

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = birler;
}
