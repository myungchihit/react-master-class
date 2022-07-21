import storage from './storage.js';

const tag = "[Store]";

class Store {
  constructor(storage) {
    
    if(!storage) throw "no storage";

    this.storage = storage;

  }

  search(keyword){
    return this.storage.productData.filter(product => product.name.includes(keyword));
  }

  // 추천 검색어 데이터 가져오기
  getKeywordList(){
    return this.storage.keywordData;
  }

  
  
}

const store = new Store(storage);
export default store