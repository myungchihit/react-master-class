import { delegate, formatRelativeDate, qs } from "../helpers.js";
import KeywordListView from "./KeywordListView.js";

const tag = '[HistoryListView]';

export default class HistoryListView extends KeywordListView {
  constructor() {
    // KeywordListView에서 인자로 element 와 아래 검색어 목록 template을 받는다.
    super(qs("#history-list-view") , new Template());

  }

  bindEvents(){
    // 최근 검색어 목록의 removeBtn 이벤트 바인딩
    delegate(this.element, "click", "button.btn-remove", (event) => this.handleClickRemoveButton(event));
    super.bindEvents();
  }

  // 최근 검색어 제거
  handleClickRemoveButton(event){
    // 최근 검색어 제거는 Model의 역할이기 때문에 외부로 이벤트를 빼준다.
    const value = event.target.parentElement.dataset.keyword; // button이 li 아래 element이기 때문에 parent로
    this.emit('@remove' , { value })
  }
}

class Template {
  getEmptyMessage(){
    return `<div class="empty-box">검색 이력이 없습니다.</div>`;
  }
  
  getList(data = []){
    return `
      <ul class="list">
        ${data.map(this._getItem).join("")}
      </ul>
    `;
  }

  _getItem({id , keyword, date}) {
    return `
      <li data-keyword="${keyword}">
        ${keyword}
        <span class="date">${formatRelativeDate(date)}</span>
        <button class="btn-remove"></button>
      </li>
    `;
  }
}