const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView ,  searchResultView , tabView}){
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents(){
    // View.js의 정의된 on이기 때문에 return으로 this를 준다 --> 메서드 체이닝이 가능
    this.searchFormView.on('@submit', event => this.search(event.detail.value))
    .on('@reset', () => this.reset());

    // 탭 클릭시 위임된 이벤트 실행
    this.tabView.on('@change', event => this.changeTab(event.detail.value));
  }

  search(searchKeyword){
    console.log(tag, searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  reset(){
    this.store.searchKeyword = "";
    this.store.searchResult = [];  
    this.render();
  }

  changeTab(selectedTab){ // 탭변경 이벤트
    this.store.selectedTab = selectedTab;
    this.render();
  }

  // controller가 view를 제어할 수 있는
  render(){
    if(this.store.searchKeyword.length > 0){
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab); // 누른 탭 정보
    this.searchResultView.hide();
  }

  renderSearchResult(){
    this.tabView.hide();
    this.searchResultView.show(this.store.searchResult);
  }
}
