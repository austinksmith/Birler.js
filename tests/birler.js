/* jshint esversion: 6, curly: true, eqeqeq: true, forin: true */

/***********************************************************************************
* Title: Hamsters.js                                                               *
* Description: 100% Vanilla Javascript Multithreading & Parallel Execution Library *
* Author: Austin K. Smith                                                          *
* Contact: austin@asmithdev.com                                                    *  
* Copyright: 2015 Austin K. Smith - austin@asmithdev.com                           * 
* License: Artistic License 2.0                                                    *
***********************************************************************************/

import birler from '../src/birler';

describe("Birler Logger", () => {

  it("LogBook should be an object", () => {
    expect(typeof birler.logBook).toEqual('object');
  });

  it("LogBook Errors should be an array", () => {
    expect(typeof birler.logBook.error).toEqual('object');
    expect(birler.logBook.error.length).toEqual(0);
  });

  it("LogBook Warning should be an empty array", () => {
    expect(birler.logBook.warning).toEqual([]);
    expect(birler.logBook.warning.length).toEqual(0);
  });

  it("LogBook Info should be an empty array", () => {
    expect(birler.logBook.info).toEqual([]);
    expect(birler.logBook.info.length).toEqual(0);
  });

  it("LogBook Error should save to error array", () => {
    expect(birler.logBook.error.length).toEqual(0);
    birler.error('Pay no mind to the birler behind the curtain');
    expect(birler.logBook.error.length).toEqual(1);
  });

  it("LogBook Info should save to info array", () => {
    expect(birler.logBook.info.length).toEqual(0);
    birler.info('The birler we need but dont deserve');
    expect(birler.logBook.info.length).toEqual(1);
  });

  it("LogBook Warning should save to warning array", () => {
    expect(birler.logBook.warning.length).toEqual(0);
    birler.warning('One birler to rule them all');
    expect(birler.logBook.warning.length).toEqual(1);
  });

  it("CreateAndSaveStampedMessage should generate a time stamped message for info type", () => {
    let timeStampedMessage = birler.createAndSaveStampedMessage('info', 'One log at a time');
    expect(timeStampedMessage).toContain('Birler.js');
    expect(timeStampedMessage).toContain('info');
    expect(timeStampedMessage).toContain('One log at a time');
  });

  it("CreateAndSaveStampedMessage should generate a time stamped message for warning type", () => {
    let timeStampedMessage = birler.createAndSaveStampedMessage('warning', 'Some birlers do an awful lot of logging without a brain');
    expect(timeStampedMessage).toContain('Birler.js');
    expect(timeStampedMessage).toContain('warning');
    expect(timeStampedMessage).toContain('Some birlers do an awful lot of logging without a brain');
  });

  it("CreateAndSaveStampedMessage should generate a time stamped message for error type", () => {
    let timeStampedMessage = birler.createAndSaveStampedMessage('error', 'Birlers rule the world');
    expect(timeStampedMessage).toContain('Birler.js');
    expect(timeStampedMessage).toContain('error');
    expect(timeStampedMessage).toContain('Birlers rule the world');
  });

  it("Search log book should return results for error event", () => {
    let savedMessageObject = birler.searchLogBook('Birlers rule', 'error');
    expect(typeof savedMessageObject).toEqual('object');
    expect(savedMessageObject.total).toEqual(1);
    expect(savedMessageObject.results[0]).toContain('Birlers rule the world');
  });

  it("Search log book should return results for info event", () => {
    let savedMessageObject = birler.searchLogBook('One log', 'info');
    expect(typeof savedMessageObject).toEqual('object');
    expect(savedMessageObject.total).toEqual(1);
    expect(savedMessageObject.results[0]).toContain('One log at a time');
  });

  it("Search log book should return results for warning event", () => {
    let savedMessageObject = birler.searchLogBook('Some birlers', 'warning');
    expect(typeof savedMessageObject).toEqual('object');
    expect(savedMessageObject.total).toEqual(1);
    expect(savedMessageObject.results[0]).toContain('Some birlers do an awful lot of logging without a brain');
  });

  it("Search log book should return results without error event", () => {
    let savedMessageObject = birler.searchLogBook('Birlers rule');
    expect(typeof savedMessageObject).toEqual('object');
    expect(savedMessageObject.total).toEqual(1);
    expect(savedMessageObject.results[0]).toContain('Birlers rule the world');
  });

  it("Search log book should return results without info event", () => {
    let savedMessageObject = birler.searchLogBook('at a time');
    expect(typeof savedMessageObject).toEqual('object');
    expect(savedMessageObject.total).toEqual(1);
    expect(savedMessageObject.results[0]).toContain('One log at a time');
  });

  it("Search log book should return results without warning event", () => {
    let savedMessageObject = birler.searchLogBook('logging without a brain');
    expect(typeof savedMessageObject).toEqual('object');
    expect(savedMessageObject.total).toEqual(1);
    expect(savedMessageObject.results[0]).toContain('Some birlers do an awful lot of logging without a brain');
  });

});