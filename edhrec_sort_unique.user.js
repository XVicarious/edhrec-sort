// ==UserScript==
// @name EDHREC Unique Sorter
// @namespace http://xvicario.us/
// @version 0.1
// @description Sorts the unique cards on EDHREC by % Unique
// @match https://edhrec.com/recs/*
// @copyright 2017+, Brian Maurer a.k.a XVicarious
// @require https://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==

(function() {
  let workingElements = $('a[name=yourmostuniquecards]').nextAll('.nw');
  for (let i = 0; i < workingElements.length; i++) {
    let $workingElement = $(workingElements[i]);
    let workingPercent = parseInt($workingElement.find('.nwdesc')
                                             .text().split('%')[0]);
    for (let j = 0; j < workingElements.length; j++) {
      let $comparedElement = $(workingElements[j]);
      let comparedPercent = parseInt($comparedElement.find('.nwdesc')
                                                 .text().split('%')[0]);
      if (workingPercent < comparedPercent && i > j) {
        $workingElement.insertBefore($comparedElement);
        workingElements = $('a[name=yourmostuniquecards]').nextAll('.nw');
        i--;
        break;
      }
    }
  }
})();
