
import storage from './storage.js';
import { createNextId } from "./helpers.js";

const tag = "[Store]";

class Store {
  constructor(storage) {
    
    if(!storage) throw "no storage";

    this.storage = storage;

  }

  search(keyword){
    this.addHistory(keyword);
    return this.storage.productData.filter(product => product.name.includes(keyword));
  }

  // 추천 검색어 데이터 가져오기
  getKeywordList(){
    return this.storage.keywordData;
  }

  // 검색 기록 데이터 가져오기
  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }  
  
  // 검색기록 최근 정렬
  _sortHistory(history1, history2){
    return history2.date - history1.date;
  }

  // 최근검색어 키워드 추가
  addHistory(keyword){
    keyword = keyword.trim();
    if(!keyword) return;

    // 최근 검색어 목록에 검색된 keyword가 있는지 체크
    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword);

    if(hasHistory){
      this.removeHistory(keyword);
    }

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({id, date, keyword});
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }

  // 최근검색어 키워드 제거
  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter((history) => history.keyword !== keyword)
  }

}

const store = new Store(storage);
export default store