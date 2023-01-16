import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {
static defaultProps = {
  country:'in',
  pageSize: 8,
  category: 'general'  
}
static propTyes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

constructor(){
  super();
  this.state= {
    articles : [],
    loading : false,
    page:1,
    totalResults: 0
  }
}
    async componentDidMount(){
      this.updateFunc()
  }

  async updateFunc()
  {
    this.props.setProgress(30)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b31203d7e49c4b818b72dbaa322c5d66&page=${this.state.page}&pageSize=${this.props.pageSize}` ;
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false})
      this.props.setProgress(100)
  }
  
  handlePrevClick = async ()=>{
      this.setState({page: this.state.page-1 })
    this.updateFunc();
  }
  

  handleNextClick = async ()=>{
    this.setState({ page: this.state.page+1})
  this.updateFunc();
  }

  fetchMoreData = async() => {
   this.setState({page: this.state.page +1});
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b31203d7e49c4b818b72dbaa322c5d66&page=${this.state.page}&pageSize=${this.props.pageSize}` ;
    
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
      })
  }

  render() {

    return (
      <>
      <h1 className="text-center" style={{margin: '30px 0px'}}>NewsMonkey  -  Top Headlines</h1>
      {this.state.loading && <Spinner/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
      <div className="row">
        {   this.state.articles.map(
          (element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} source={element.source.name} date={element.publishedAt}/>
            </div>
       
          }
        )}
    
         </div></div>
         
        </InfiniteScroll>
    
     

      </>
    )
  }
}

export default News