import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'; 

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'


  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,

  }
 
  
  constructor(){
    super();
    console.log("hello");
    this.state = {
      articles: [],
      loading: true,
      page: 1

    }
  }

  async componentDidMount(){
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f59951666c2d476ab5cfee9a6297eb01&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})

  }
  handleNextClick = async ()=> {

    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f59951666c2d476ab5cfee9a6297eb01&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({loading: false});

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })


  }
}
  handlePrevClick = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f59951666c2d476ab5cfee9a6297eb01&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading: false});
    console.log(parsedData);
    

    this.setState({
      page: this.state.page -1,
      articles: parsedData.articles
    })

  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center my-3'>News Monkey Top HeadLines</h2>
        {this.state.loading && <Spinner/>}
        
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{

            return <div key={element.url} className="col-md-4">
              <NewsItem  title={element.title} desc={element.description} Imageurl={element.urlToImage?element.urlToImage:"https://images.mktw.net/im-96067118/social"} newsUrl={element.url}/>
            </div>

        })}
          

        </div> 
        <div className="container my-3">
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handlePrevClick}>Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNextClick}>Next</button>
        </div>
        </div>
          
      </div>
    )
  }
}

export default News