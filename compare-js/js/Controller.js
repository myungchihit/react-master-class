const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView }){
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents(){
    // View.js on이기 때문에 return으로 this를 준다 --> 메서드 체이닝이 가능
    this.searchFormView.on('@submit', event => this.search(event.detail.value))
    .on('@reset', () => this.reset());
  }

  search(keyword){
    console.log(tag, keyword);
  }

  reset(){
    console.log(tag, "reset");
  }
}
