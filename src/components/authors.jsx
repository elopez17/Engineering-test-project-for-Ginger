import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/authors.css';
import { getArticles, getArticlesByAuthor, getRecent } from "../util/articles";
import merge from 'lodash/merge';

class AuthorsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      authors: [],
      nArticles: {}
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    getArticles().then(articles => {
      let current = new Date();
      let nDays = 30;
      let recentArticles = getRecent(current, nDays, articles);

      while (recentArticles.length < 30 && recentArticles.length !== articles.length) {
        recentArticles = getRecent(current, ++nDays, articles);
      }
      let authors = [];
      for (let i = 0; i < recentArticles.length; i++) {
        authors = authors.concat(recentArticles[i].authors);
      }
      authors = authors.slice(0, 30);
      this.setState({ authors: authors });
      for (let i = 0; i < authors.length; i++) {
        getArticlesByAuthor(authors[i])
          .then(articles => {
            articles = getRecent(new Date(), 30, articles);
            if (this._isMounted){
              this.setState({ nArticles: merge({}, this.state.nArticles, { [authors[i]]: articles.length }) });
            }
          })
      }
    });
  }

  componentWillUnmount(){
    this._isMounted = false;
  }
  
  render(){
    return (
      <div>
        <div className="authors_title_name">Authors</div>
        <div className="authors_title_sub">Submissions in last 30 days</div>
        {this.state.authors.map(name => (
          <div className="authors_item" key={name}>
            <Link
              to={{
                pathname: "/author",
                state: { author: name }
              }}>
            {name}
            </Link>
            <div>
              {this.state.nArticles[name] ? this.state.nArticles[name] : 0}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default AuthorsPage;