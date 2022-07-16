import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";
import TabView from "./views/TabView.js";
import KeywordListView from "./views/KeywordListView.js";

// 실행 : npx lite-server --baseDir .\compare-js\

const tag = "[main]";

document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag, 'main');

  // Model
  const store = new Store(storage);

  // View
  const views = {
    searchFormView: new SearchFormView(),
    searchResultView : new SearchResultView(),
    tabView : new TabView(),
    keywordListView : new KeywordListView(),
  };

  new Controller(store, views);
}
