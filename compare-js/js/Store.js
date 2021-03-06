import { createNextId } from "./helpers.js";
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

    // 검색시 최근검색어 추가.
    this.addHistory(keyword);
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
    return history2.date - history1.date;
  }

  // 최근 검색어 제거
  removeHistory(keyword){
    // 검색한 history 제외한 history 목록들을 다시 storage에 넣어준다.
    this.storage.historyData = this.storage.historyData.filter(history => history.keyword !== keyword);
  }

  addHistory(keyword){
    keyword = keyword.trim();
    if(!keyword) return;

    // 최근 검색어 목록에 검색된 keyword가 있는지 체크
    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword);
    
    // 최근 검색어 목록에 검색된 키워드가 있을시 제거
    if(hasHistory){ 
      this.removeHistory(keyword);
    }

    // createNextId -> helper에 정의됨.
    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({id, keyword, date});
    // 최근 날짜순 정렬
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
}
