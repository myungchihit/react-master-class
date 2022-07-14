const tag = "[Store]";

export default class Store {
  constructor(storage) {
    
    if(!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = ""; // 검색어
    this.searchResult = [];  // 검색 결과 데이터 저장
  }

  search(keyword){
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product => product.name.includes(keyword));
  }
}
