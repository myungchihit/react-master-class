import store from './js/Store.js'

const TabType = { // Store.js에서 사용할 수 있게 export
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY"
}

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어'
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchKeyword : "",
      searchResult : [],
      sumitted: false, // 검색시 검색 결과 유무
      selectedTab: TabType.KEYWORD,
      keywordList: [],
    };
  }

  // react 생명주기 
  // mount : 돔에 반영되는것.
  // componentDidMount : 돔에 마운트될때 이벤트를 바인딩하거나 외부 데이터를 가져오는 작업 수행.
  // componentWillUnmount : 이벤트 핸들러를 제거하는 등 리소스 정리 작업.
  componentDidMount(){
    // 추천 검색어 가져와서 state에 반영
    const keywordList = store.getKeywordList();
    this.setState({keywordList});
  }


  // input 변경 이벤트
  handleChangeInput(event){
    // state가 자동으로 render함수를 실행시키려면 직접적으로 state에 값을 집어넣으면 안된다.
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();  // 강제로 render 함수를 실행시킴 --> 비추천
    const searchKeyword = event.target.value;
    if(searchKeyword.length <= 0 && this.state.sumitted) { return this.handleReset(); }

    this.setState({searchKeyword});
  }

  // submit 이벤트
  handleSubmit(event){
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword){
    const searchResult = store.search(searchKeyword);
    this.setState({ 
      searchKeyword,
      searchResult,
      sumitted : true,
    });
  }

  // reset 이벤트
  handleReset(){
    // setState는 비동기이기 때문에, setState가 모두 완료된 후 콜백함수로 console을 찍어줌.
    this.setState(() => {
      return { 
        searchKeyword : "",
        sumitted: false,
      }
    }, () => {
      
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

    // 검색 폼 Dom
    const searchForm = (
      <form 
        onSubmit={event => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
       <input type="text" 
         placeholder="검색어를 입력하세요" 
         autoFocus 
         value={this.state.searchKeyword}
         onChange={event => this.handleChangeInput(event)}   
        />
       {/* {resetButton}  //조건부 렌더링 방식*/}
       {/* {this.state.searchKeyword.length > 0 ? (<button type="reset" className="btn-reset"></button>) : null} */}
       {this.state.searchKeyword.length > 0 && 
          (<button type="reset" className="btn-reset"></button>)
        }
     </form>
    );
    
    // 검색 결과 Dom
    const searchResult = (
      this.state.searchResult.length > 0 
      ? (
        <ul className="result">
          {this.state.searchResult.map(item => {
            return (
              <li key={item.id}>
                <img src={item.imageUrl} alt ={item.name} />
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul>
      ) 
      : (<div className="empty-box">검색 결과가 없습니다.</div>)
    )
    
    // 추천검색어 리스트 Dom
    const keywordList = (
      <ul className="list">
        {this.state.keywordList.map((item, index) => {
          return (
            <li key={item.id} onClick={() => this.search(item.keyword)}>
              <span className="number">{index + 1}</span>
              <span>{item.keyword}</span>
            </li>
          )
        })}
      </ul>
    );

    // Tab Dom
    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map(tabType => {
            return(
              <li key={tabType} 
                  className={this.state.selectedTab === tabType ? "active" : ""}
                  onClick={() => this.setState({selectedTab : tabType})}>
                {TabLabel[tabType]}
              </li>
            )
          })}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && keywordList}
        {this.state.selectedTab === TabType.HISTORY && <>최근검색어</>}
      </>
    )

    return(
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            { this.state.sumitted ? searchResult : tabs}
          </div>
        </div>
      </>
    )
  }
}


ReactDOM.render(<App />, document.querySelector("#app"));