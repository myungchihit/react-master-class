import React from 'react';
import store from '../Store.js';
import List from './List.js';

// keywordList state를 가져야 하기때문에 class로 만든다.
export default class KeywordList extends React.Component {
  constructor(){
    super();
    this.state = {
      keywordList: [],
    }
  }
  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({keywordList});
  }

  // 조합 방법
  // render(){
  //   return (
  //     <List 
  //       data={this.state.keywordList} 
  //       onClick={this.props.onClick} 
  //       renderItem={(item, index) => {
  //         return(
  //           <>
  //             <span className="number">{index + 1}</span>
  //             <span>{item.keyword}</span>
  //           </>
  //         )
  //       }}/>
  //   )
  // }

  // 조합-특수화 방법
  render(){
    return (
      <List 
        data={this.state.keywordList} 
        onClick={this.props.onClick} 
        hasIndex={true}
      />
    )
  }
}