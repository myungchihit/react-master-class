import React from 'react';
import store from '../Store.js';
import List from './List.js';
import { formatRelativeDate } from '../helpers.js';

export default class HistoryList extends React.Component {
  constructor(){
    super();
    this.state = {
      historyList : [],
    }
  }

  componentDidMount(){
    this.fetch();
  }

  handleClickRemoveHistory(keyword){
    store.removeHistory(keyword);
    this.fetch();
  }

  
  fetch(){
    const historyList = store.getHistoryList();
    this.setState({historyList})
  }

  // 조합 방법
  // render(){
  //   return (
  //     <List
  //       data={this.state.historyList}
  //       onClick={this.props.onClick}
  //       renderItem={
  //         (item) => (
  //           <>
  //             <span>{item.keyword}</span>
  //             <span className="date">{formatRelativeDate(item.date)}</span>
  //             <button 
  //               className="btn-remove" 
  //               onClick={event => this.handleClickRemoveHistory(event, item.keyword)}>            
  //             </button>
  //           </>
  //         )
  //       }
  //     />
  //   )
  // }

  // 조합-특수화 방법
  render(){
    return (
      <List
        data={this.state.historyList}
        onClick={this.props.onClick}
        hasDate={true}
        onRemove={(keyword) => this.handleClickRemoveHistory(keyword)}
      />
    )
  }

}