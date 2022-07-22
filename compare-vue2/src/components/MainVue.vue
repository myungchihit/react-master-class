<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <form
        @submit.prevent="onSearch(searchKeyword)"
        @reset="onReset"
      >
        <input 
          type="text" 
          placeholder="검색어를 입력하세요" 
          autofocus
          v-model="searchKeyword"
          @keyup="onKeyup"
        />
        <button type="reset" class="btn-reset" v-show="searchKeyword.length > 0"></button>
      </form>

      <div class="content">
        <div v-if="submitted">
          <div v-if="searchResult.length">
            <ul class="result">
              <li v-for="(item) in searchResult" :key="item.id">
                <img :src="item.imageUrl" :alt="item.name" />
                <p>{{ item.name }}</p>
              </li>
            </ul>
          </div>
          <div class="empty-box" v-else> 검색결과가 없습니다.</div>
        </div>
        <div v-else>
          <!-- tab -->
          <ul v-show="!submitted" class="tabs">
            <li v-for="tab in tabs" 
                :key="tab" 
                v-bind:class="{active : tab === selectedTab}"
                @click="onClickTab(tab)"
            >
              {{ tab }}
            </li>
          </ul>
          <!-- 추천 검색어 -->
          <div v-if="selectedTab === tabs[0]">
            <ul class="list">
              <li 
                v-for="(item, index) in keywordList" 
                :key="item.id"
                @click="onSearch(item.keyword)"
              >
                <span class="number">{{ index + 1 }}</span>
                <span>{{ item.keyword }}</span>
              </li>
            </ul>
          </div>
          <!-- 최근 검색어 -->
          <div v-if="selectedTab === tabs[1]">
            <ul class="list">
              <li 
                v-for="(history) in historyList" 
                :key="history.id"
                @click="onSearch(history.keyword)"
              >
                <span>{{ history.keyword }}</span>
                <span class="date">{{ formatDate(history.date) }}</span>
                <button 
                  type="button" 
                  class="btn-remove"
                  @click.stop="removeClickHistory(history.keyword)"
                ></button>
              </li>
            </ul>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store/Store.js';
  import { formatRelativeDate } from '../helpers.js';
  export default {
    data() {
      return {
        searchKeyword: "",
        searchResult : [],
        submitted: false,
        tabs : ["추천 검색어", "최근 검색어"],
        selectedTab : "",
        keywordList : [],
        historyList : [],
      }
    },
    created(){
      this.selectedTab = this.tabs[0];
      this.fetchKeywordList();
      this.fetchHistoryList();
    },
    methods: {
      onKeyup(){
        if(this.searchKeyword.length <= 0) return this.onReset();
      },
      onSearch(keyword){
        this.searchKeyword = keyword;
        this.searchResult = store.search(keyword);
        this.submitted = true;
        store.addHistory(keyword);
        this.fetchHistoryList();
      },
      onReset() {
        this.submitted = false;
        this.searchKeyword = "";
        this.searchResult = [];
      },
      onClickTab(tab){
        this.selectedTab = tab;
      },
      fetchKeywordList(){
        this.keywordList = store.getKeywordList();
      },
      fetchHistoryList(){
        this.historyList = store.getHistoryList();
      },
      formatDate(date){
        return formatRelativeDate(date);
      },
      removeClickHistory(keyword){
        this.historyList = store.removeHistory(keyword);
      }
    }
  }
</script>

<style scoped>
  body,
  ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  img {
    width: 100%;
  }

  button:focus,
  button:hover {
    cursor: pointer;
  }

  .container {
    margin: 0 15px 0 15px;
  }

  header {
    border-bottom: 1px #ccc solid;
    padding: 15px 0 15px 0;
    text-align: center;
  }

  input[type=text] {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 15px 0 15px 0;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #cccccc;

  }

  .content {
    border: 1px solid #ccc;
  }

  ul.tabs {
    display: flex;
  }

  .tabs li {
    display: inline-block;
    width: 50%;
    padding: 15px;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    background-color: #eee;
    color: #999;
  }

  .tabs li.active {
    background-color: #2ac1bc;
    color: #fff;
  }

  .tabs li:hover,
  .tabs li:focus {
    cursor: pointer;
  }

  .list li {
    box-sizing: border-box;
    display: block;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    position: relative;
  }

  .list li:last-child {
    border-bottom: none;
  }

  .list li .number {
    margin-right: 15px;
    color: #ccc;
  }

  .list li .date {
    position: absolute;
    right: 50px;
    top: 15px;
    color: #ccc;
  }

  .list li .btn-remove {
    position: absolute;
    right: 0px;
    top: 15px;
    margin-right: 15px;
  }

  form {
    position: relative;
  }

  .btn-reset,
  .btn-remove {
    border-radius: 50%;
    background-color: #ccc;
    color: white;
    border: none;
    padding: 3px 6px;
  }

  .btn-reset {
    position: absolute;
    top: 12px;
    right: 10px;
  }

  .btn-reset::before,
  .btn-remove::before {
    content: 'X'
  }

  .result li {
    display: flex;
    margin-bottom: 16px;
    height: 80px;

  }

  .result li:last-child {
    margin-bottom: 0;
  }

  .result img {
    width: 100px;
    object-fit: cover;
  }

  .result p {
    display: flex;
    align-items: center;
    padding: 0 8px;
  }

  .empty-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: grey;
  }
</style>