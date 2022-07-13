import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";

// 실행 : npx lite-server --baseDir .\compare-js\

const tag = "[main]";

document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag, 'main');

  // Model
  const store = new Store(storage);

  // View
  const views = {
    searchFormView: new SearchFormView()
  };

  new Controller(store, views);
}