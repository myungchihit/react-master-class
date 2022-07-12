import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";

// 실행 : npx lite-server --baseDir .\compare-js\

const tag = "[main]";

document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag, 'main');
  const store = new Store(storage);

  const views = {

  };

  new Controller(store, views);
}
