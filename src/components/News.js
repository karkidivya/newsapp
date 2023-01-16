import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'




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
    page:1
  }
}
    async componentDidMount(){
      this.updateFunc()
  }

  async updateFunc()
  {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b31203d7e49c4b818b72dbaa322c5d66&page=${this.state.page}&pageSize=${this.props.pageSize}` ;
    this.setState({loading:true});
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      totalResults: parsedData.totalResults,
      articles: parsedData.articles,
      loading: false})
  }
  
  handlePrevClick = async ()=>{
      this.setState({page: this.state.page-1 })
    this.updateFunc();
  }
  

  handleNextClick = async ()=>{
    this.setState({ page: this.state.page+1})
  this.updateFunc();
  }

  render() {

    return (
      <div className="container my-3" >
      <h1 className="text-center" style={{margin: '40px 0px'}}>NewsMonkey  -  Top Headlines</h1>
      {this.state.loading && <Spinner/>}
      <div className="row">
        {!this.state.loading && this.state.articles.map(
          (element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author} source={element.source.name} date={element.publishedAt}/>
            </div>
       
          }
        )}
       
      </div>
      <div className="d-flex justify-content-between">
      <button disabled={this.state.page <= 1 } type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous </button>
     
      <button  disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
     

      </div>
    )
  }
}

export default News