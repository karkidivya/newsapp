import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {


constructor(){
  super();
  this.state= {
    articles : [],
    loading : false,
    page:1
  }
}
    async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b31203d7e49c4b818b72dbaa322c5d66&page=1&pageSize=10" ;
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults })
    console.log("hello")
  }
  handlePrevClick = async ()=>{
    
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b31203d7e49c4b818b72dbaa322c5d66&page=${this.state.page-1}&pageSize=10` ;
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page-1,
        articles: parsedData.articles})
    }
  

  handleNextClick = async ()=>{
    if (this.state.page +1 > Math.ceil(this.state.totalResults/10)){

  
    } 
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b31203d7e49c4b818b72dbaa322c5d66&page=${this.state.page+1}&pageSize=10` ;
      let data = await fetch(url)
      let parsedData = await data.json()
      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles})
    }
  }

  render() {

    return (
      <div className="container my-3" >
      <h2>NewsMonkey  -  Top Headlines</h2>
      <div className="row">
        {this.state.articles.map(
          (element)=>{
            return  <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} />
            </div>
       
          }
        )}
       
      </div>
      <div className="d-flex justify-content-between">
      <button disabled={this.state.page <= 1 } type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous </button>
     
      <button  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
     

      </div>
    )
  }
}

export default News