import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/landing.css';

class LandingPage extends Component {
  render() {
    return (
    <div id="landing">
      <div>Test Project</div>
      <Link to="/articles">ARTICLES</Link>
      <Link to="/authors">AUTHORS</Link>
    </div>
    );
  }
}

export default LandingPage;