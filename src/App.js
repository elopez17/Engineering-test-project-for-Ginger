import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import './stylesheets/App.css';
import ArticlesPage from './components/articles';
import ArticlePage from './components/article';
import AuthorsPage from './components/authors';
import AuthorPage from './components/author';
import LandingPage from './components/landing';

class App extends Component {
  constructor(props){
    super(props);
    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome(){
    if (this.props.location.pathname !== "/") {
      this.props.history.push("/");
    }
  }

  homebutton(){
    if (this.props.location.pathname === "/") {
      return null;
    } else {
      return <Link id="home_btn" to="/">HOME</Link>;
    }
  }

  render() {
    return (
      <div className="App">
        <h1 onClick={this.redirectHome}>ginger</h1>
        {this.homebutton()}  
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/articles" component={ArticlesPage} />
          <Route exact path="/articles/:id" component={ArticlePage} />
          <Route exact path="/authors" component={AuthorsPage} />
          <Route exact path="/author" component={AuthorPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
