import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description , imageUrl, newsUrl} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageUrl? "https://c.ndtvimg.com/2023-01/lt8779u_shopify-bloomberg_625x300_05_January_23.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem