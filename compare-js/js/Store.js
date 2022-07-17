import { TabType } from "./views/TabView.js";
const tag = "[Store]";

export default class Store {
  constructor(storage) {
    
    if(!storage) throw "no storage";

    this.storage = storage;

    // 생성자이기 때문에 기본설정
    this.searchKeyword = ""; // 검색어
    this.searchResult = [];  // 검색 결과 데이터 저장
    this.selectedTab = TabType.KEYWORD;
  }

  search(keyword){
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product => product.name.includes(keyword));
  }

  // 추천 검색어 조회
  getKeywordList(){
    return this.storage.keywordData;
  }

  // 최근 검색어 조회
  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }

  // 날짜별 sort
  _sortHistory(history1, history2){
    return history2.date > history1.date
  }
}
