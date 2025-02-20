(async () => {
  const srcParseDom = chrome.extension.getURL('src/inject/parse_dom.js');
  const srcRating = chrome.extension.getURL('src/inject/rating.js');

  const importParseDom = await import(srcParseDom);
  const importRating = await import(srcRating);

  const ParseDOM = new importParseDom.default();
  const Rating = new importRating.default();

  chrome.runtime.onMessage.addListener(
    function(request, _, sendResponse) {
      switch (request.action) {
        case "parse_dom_sellers":
          sendResponse({vendedores: ParseDOM.parseAllSellers()});
          break;
        case "parse_dom_single":
          sendResponse({vendedor: ParseDOM.parseCurrentSeller()});
          break;
        case "compute_rating":
          sendResponse({vendedor: Rating.rate(request.vendedor)});
          break;
      }
    }
  );
})();

