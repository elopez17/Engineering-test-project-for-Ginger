import React, { Component } from 'react';
import { getArticles, getRecent } from '../util/articles';
import { Link } from 'react-router-dom';
import '../stylesheets/articles.css';

class ArticlesPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount(){
    getArticles().then(articles => {
      let current = new Date();
      let nDays = 30;
      let recentArticles = getRecent(current, nDays, articles);
      
      while (recentArticles.length < 30 && recentArticles.length !== articles.length) {
        recentArticles = getRecent(current, ++nDays, articles);
      }
      this.setState({ articles: recentArticles.slice(0, 30) });
    });
  }

  render() {
    return (
    <div>
      <div className="page_title">Articles</div>
      {
        this.state.articles.map(article => {
          let id = article.id.slice(article.id.lastIndexOf("/") + 1);
          return (
            <Link className="article_link" key={id} 
              to={{
                pathname: `/articles/${id}`,
                state: article
              }}>
            {article.title}
            </Link>
          );
        })
      }
    </div>
    )
  }
}

export default ArticlesPage;