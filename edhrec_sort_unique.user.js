// ==UserScript==
// @name EDHREC Unique Sorter
// @namespace http://xvicario.us/
// @version 0.2
// @description Sorts the unique cards on EDHREC by % Unique
// @match https://edhrec.com/recs/*
// @copyright 2017+, Brian Maurer a.k.a XVicarious
// @require https://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==

(function() {
  const $uniqueCardsStart = $('a[name=yourmostuniquecards]');
  $uniqueCardsStart.next('.page-header').append(
    '<select id="uniqueCardsSort" class="xv-select">' +
      '<option value="">none</option>' +
      '<option value="pctUniqueAsc">% Unique (&#9650;)</option>' +
      '<option value="pctUniqueDec">% Unique (&#9660;)</option>' +
    '</select>'
  );
  $(document).on('change', '#uniqueCardsSort', function() {
    const selectVal = $(this).val();
    if (selectVal === 'pctUniqueAsc') {
      sortByUniqueness(false);
    } else if (selectVal === 'pctUniqueDec') {
      sortByUniqueness(true);
    }
  });
  function sortByUniqueness(descending) {
    let workingElements = $uniqueCardsStart.nextAll('.nw');
    for (let i = 0; i < workingElements.length; i++) {
      let $workingElement = $(workingElements[i]);
      let workingPercent = parseInt($workingElement.find('.nwdesc')
                                               .text().split('%')[0]);
      for (let j = 0; j < workingElements.length; j++) {
        let $comparedElement = $(workingElements[j]);
        let comparedPercent = parseInt($comparedElement.find('.nwdesc')
                                                   .text().split('%')[0]);
        if ((!descending || workingPercent > comparedPercent) &&
            (descending || workingPercent < comparedPercent) &&
             i > j) {
          $workingElement.insertBefore($comparedElement);
          workingElements = $uniqueCardsStart.nextAll('.nw');
          i--;
          break;
        }
      }
    }
  }
})();
