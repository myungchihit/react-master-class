import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView, tabView, keywordListView, historyListView }){
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents(){
    // View.js의 정의된 on이기 때문에 return으로 this를 준다 --> 메서드 체이닝이 가능
    this.searchFormView.on('@submit', event => this.search(event.detail.value))
    .on('@reset', () => this.reset());

    // 탭 클릭시 위임된 이벤트 실행
    this.tabView.on('@change', event => this.changeTab(event.detail.value));

    // 추천 검색어 클릭시 해당 검색어로 이동 --> this.search
    this.keywordListView.on('@click', event => this.search(event.detail.value));

    // 최근 검색어 클릭시 해당 검색어로 이동 ( HistoryListView가 KeywordListView를 상속 받아서 )
    this.historyListView.on('@click', event => this.search(event.detail.value));
  }

  // 검색어 검색
  search(searchKeyword){
    console.log(tag, searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  // 검색어 리셋
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

    // 검색어가 있을경우
    if(this.store.searchKeyword.length > 0){
      return this.renderSearchResult();
    }

    this.tabView.show(this.store.selectedTab); // 누른 탭 정보

    // 선택된 탭에따라 추천검색어 최근검색어 출력
    if(this.store.selectedTab === TabType.KEYWORD){
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide();
    }
    else if(this.store.selectedTab === TabType.HISTORY){
      this.keywordListView.hide();
      this.historyListView.show(this.store.getHistoryList());
    }
    else{  // 둘다 아니면 예외
      throw "사용할 수 없는 탭입니다.";
    }

    this.searchResultView.hide();
  }

  // 검색어 뷰 출력 유무 --> 오로지 검색어 키워드 출력만.
  renderSearchResult(){
    this.searchFormView.show(this.store.searchKeyword);
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();

    this.searchResultView.show(this.store.searchResult);
  }
}
