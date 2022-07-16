import { delegate, qs } from "../helpers.js";
import View from "./View.js";

export default class KeywordListView extends View {
  constructor() {
    
    super(qs("#keyword-list-view"));
    
    this.template = new Template();
    this.bindEvents();

  }

  show(data = []){
    this.element.innerHTML = 
        data.length > 0 
        ? this.template.getList(data) 
        : this.template.getEmptyMessage();

    super.show();
  }

  bindEvents() {
    delegate(this.element, "click", "li", event => this.handleClick(event));
  }

  // 추천 검색어 클릭시 검색어로 이동
  handleClick(event){
    const value = event.target.dataset.keyword;
    // 검색어 이동은 여기서 처리하는게 아니여서 이벤트 위임
    this.emit("@click" , {value});
  }
}

class Template {
  
  getEmptyMessage(){
    return `<div class="empty-box">추천 검색어가 없습니다.</div>`;
  }
  
  getList(data = []){
    return `
      <ul class="list">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({id , keyword}) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `;
  }

}