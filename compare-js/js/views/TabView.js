import { delegate, qs, qsAll } from "../helpers.js";
import View from "./View.js";

export const TabType = { // Store.js에서 사용할 수 있게 export
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY"
}

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어'
}

export default class TabView extends View {
  constructor(){
    super(qs("#tab-view"));
    this.template = new Template();
    this.bindEvents();
  }

  show(selectedTab) { // active시킬 탭종류 --> Model이 가지고 있어야함 --> Store.js
    this.element.innerHTML = this.template.getTabList();

    qsAll("li" , this.element).forEach(li => {
      // li.dataset.tab --> li태그의 data-tab 속성
      li.className = li.dataset.tab === selectedTab ? "active" : "";
    })

    super.show();
  }

  bindEvents(){
    delegate(this.element, "click", "li", event => this.handleClick(event));
  }

  handleClick(event){ // 탭클릭 이벤트
    const value = event.target.dataset.tab;
    this.emit('@change', {value})
  }
}

class Template {
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map(tabType => ({ tabType, tabLabel: TabLabel[tabType]}))
          .map(this._getTab).join("")
        }
      </ul>
    `;
  }

  _getTab({tabType, tabLabel}){
    return `
      <li data-tab="${tabType}">
        ${tabLabel}
      </li>
    `
  }
}