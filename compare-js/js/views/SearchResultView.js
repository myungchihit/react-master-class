import View from './View.js';
import { qs } from '../helpers.js';

export default class SearchResultView extends View{
  constructor(){
    super(qs("#search-result-view"));

    // 동적으로 Dom을 만들어야하기 때문에 Template 내부 class 만들어줌
    this.template = new Template();
  }

  // 부모꺼 오버라이드해서 만들어줌.
  show(data = []){ // 검색 결과를 받음.
    this.element.innerHTML = data.length > 0 
                              ? this.template.getList(data) 
                              : this.template.getEmptyMessage();
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">검색결과가 없습니다.</div>
    `
  }

  getList(data = []) {
    return `
      <ul class="result">
        ${data.map(this._getItem).join("")}
      </ul>
    `
  }

  _getItem({ imageUrl, name }){  // 상품 데이터 (storage.js -> productData)
    return `
      <li>
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
      </li>
    `
  }
}