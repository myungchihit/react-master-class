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
}
