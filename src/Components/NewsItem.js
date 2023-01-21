import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title , description , imageUrl , url , author , date } = this.props;
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src={!imageUrl ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" : imageUrl } className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={url} target="_blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
            </div>
        )
    }
}
