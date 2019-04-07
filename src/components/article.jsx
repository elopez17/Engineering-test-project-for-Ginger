import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import '../stylesheets/article.css';

class ArticlePage extends Component {
  render(){
    return (
    <div>
      <div className="page_title">
        {this.props.location.state.title}
      </div>
      <div className="summary">
        {this.props.location.state.summary}
      </div>
      <div className="authors">
        {
          this.props.location.state.authors.map(name => (
            <Link to={{
                pathname: "/author",
                state: { author: name }
              }} key={name}>
            {name}
            </Link>
          ))
        }
      </div>
    </div>
    );
  }
}

export default withRouter(ArticlePage);