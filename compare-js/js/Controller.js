const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView ,  SearchResultView}){
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.SearchResultView = SearchResultView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents(){
    // View.js의 정의된 on이기 때문에 return으로 this를 준다 --> 메서드 체이닝이 가능
    this.searchFormView.on('@submit', event => this.search(event.detail.value))
    .on('@reset', () => this.reset());
  }

  search(searchKeyword){
    console.log(tag, searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  reset(){
    console.log(tag, "reset");
  }

  // controller가 view를 제어할 수 있는
  render(){
    if(this.store.searchKeyword.length > 0){
      this.SearchResultView.show(this.store.searchResult);
      return;
    }

    this.SearchResultView.hide();
  }
}
