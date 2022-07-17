import { formatRelativeDate, qs } from "../helpers.js";
import KeywordListView from "./KeywordListView.js";


export default class HistoryListView extends KeywordListView {
  constructor() {
    // KeywordListView에서 인자로 element 와 아래 검색어 목록 template을 받는다.
    super(qs("#history-list-view") , new Template())
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