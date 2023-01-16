import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description , imageUrl,source, newsUrl,author,date} = this.props;
    return (
      <div>
        <div className="card" >
  <img src={!imageUrl? "https://c.ndtvimg.com/2023-01/lt8779u_shopify-bloomberg_625x300_05_January_23.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span className="position-absolute top-0  translate-middle  badge rounded-pill bg-danger" style={{left: '90%', zIndex:'1'}}>{source}
    </span>
  <span className="sr-only">unread messages</span></h5>
    <p className="card-text">{description}</p>
    <p className ="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem