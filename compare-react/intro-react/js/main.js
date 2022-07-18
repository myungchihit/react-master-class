class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchKeyword : "",
    };
  }

  // input 변경 이벤트
  handleChangeInput(event){
    // state가 자동으로 render함수를 실행시키려면 직접적으로 state에 값을 집어넣으면 안된다.
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();  // 강제로 render 함수를 실행시킴 --> 비추천
    const searchKeyword = event.target.value;

    if(searchKeyword.length <= 0) { return this.handleReset(); }

    this.setState({searchKeyword});
  }

  // submit 이벤트
  handleSubmit(event){
    event.preventDefault();
    console.log("handleSubmit : ", this.state.searchKeyword);
  }

  // reset 이벤트
  handleReset(){
    // setState는 비동기이기 때문에, setState가 모두 완료된 후 콜백함수로 console을 찍어줌.
    this.setState(() => {
      return { searchKeyword : ""}
    }, () => {
      console.log("handleReset", this.state.searchKeyword);
    })
  }

  render() {
    /*
      조건부 렌더링 방식 3가지
      1. 엘리먼트 변수를 사용하는 방식
      2. 삼항 연산자를 사용하는 방식
      3. && 연산자를 사용하는 방식
    */

    // 조건부 렌더링 -> 1. 엘리먼트 변수를 사용하는 방식.
    // react에선 null일경우 엘리먼트를 바인딩하지 않는다.
    // let resetButton = null;
    // if(this.state.searchKeyword.length > 0){
    //   resetButton = <button type="reset" className="btn-reset"></button>;
    // }

    return(
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form 
           onSubmit={event => this.handleSubmit(event)}
           onReset={() => this.handleReset()}
          >
            <input type="text" 
              placeholder="검색어를 입력하세요" 
              autoFocus 
              value={this.state.SearchKeyword}
              onChange={event => this.handleChangeInput(event)}   
             />
            {/* {resetButton}  //조건부 렌더링 방식*/}
            {/* {this.state.searchKeyword.length > 0 ? (<button type="reset" className="btn-reset"></button>) : null} */}
            {this.state.searchKeyword.length > 0 && 
             (<button type="reset" className="btn-reset"></button>)
            }
          </form>
        </div>
      </>
    )
  }
}


ReactDOM.render(<App />, document.querySelector("#app"));