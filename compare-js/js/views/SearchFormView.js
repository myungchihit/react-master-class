import { qs , on } from '../helpers.js';
import View from './View.js';

const tag = "[SearchFormView]"

export default class SearchFormView extends View{
  constructor() {
    super(qs("#search-form-view"));

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]" , this.element);
    
    this.showResetButton(false);
    this.bindEvent();
  }

  showResetButton(visible = true){
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvent(){
    on(this.inputElement, "keyup", () => this.handleKeyup() );
    this.on("submit", event => this.handleSubmit(event));
    on(this.resetElement, "click" , () => this.handleReset());
  }

  handleKeyup(){
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);

    if(value.length <= 0){
      this.handleReset();
    }
  }

  handleSubmit(event){
    event.preventDefault();
    console.log(tag, "handleSubmit");

    // 검색결과 내용 출력 --> 검색결과 view에 이벤트 위임
    const { value } = this.inputElement;
    this.emit("@submit", { value });
  }

  handleReset(){
    this.emit("@reset");
  }

  // 추천검색어 , 최근검색어 클릭시 input에다가 keyword 넣어주기위함
  show(value = "") {
    this.inputElement.value = value;
    this.showResetButton(this.inputElement.value.length > 0);

    super.show();
  }
}