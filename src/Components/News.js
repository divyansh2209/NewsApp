import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 4,
        category: "general"
    }

    static propTypes = {
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super()
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }


    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c8b35c5e4094326960a0720f63c4e82&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                article: parsedData.articles,
                totalArtices: parsedData.totalResults,
                loading: false
            });
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&category=${this.props.category}&apiKey=8c8b35c5e4094326960a0720f63c4e82&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            article: parsedData.articles,
            loading: false
        });
    }


    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalArtices / this.props.pageSize)) {

        } else {

            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=8c8b35c5e4094326960a0720f63c4e82&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                article: parsedData.articles,
                loading: false
            });

        }
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page +1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=8c8b35c5e4094326960a0720f63c4e82&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            {
                article: this.state.article.concat(parsedData.articles) ,
                totalArtices: parsedData.totalResults,
                loading: false
            });

    };

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">NewsMonkey - Top HeadLines </h2>
                {/*
                (if this part is true) && (this part will execute)
                 */}
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                > 
                    <div className="row my-4">
                        {this.state.article.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url} style={{ minHeight: "100% !important" }}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) + " . . ." : ""}
                                        description={element.description ? element.description.slice(0, 88) + " . . ." : ""}
                                        imageUrl={element.urlToImage}
                                        url={element.url}
                                        author={element.author ? element.author : "Unknown"}
                                        date={element.publishedAt}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
