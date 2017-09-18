import React from 'react';
import {NavLink} from 'react-router-dom';

export default class AppTopbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    const body = document.body, html = document.documentElement;
    const offset = window.pageYOffset;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - window.innerHeight;

    for (let i = 0; i < this.props.pages.length; i++) {
      let width = '0%';
      if (i < this.props.currentPage)
        width = '100%';
      if (i == this.props.currentPage) {
        var pct = Math.max(0, Math.min(1, parseFloat(offset) / parseFloat(height)));
        width = `${pct*100}%`;
      }

      document.getElementById(`page-${i}`).style.width = width;
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  }

  render() {
    const pages = [];
    const currentPage = this.props.currentPage;
    for (let i = 0; i < this.props.pages.length; i++) {
      const page = this.props.pages[i];
      const className = `dot ${i === currentPage ? 'selected' : ''} ${i <= currentPage ? 'completed' : ''}`;
      pages.push(<div className={className} key={`dot-${i}`}><p>{page}</p></div>);
      pages.push(<div className="bar" key={`bar-${i}`}><div className="bar-inner" id={`page-${i}`}></div></div>);
    }
    const className = `dot ${currentPage >= this.props.pages.length ? 'completed' : ''}`;
    pages.push(<div className={className} key="dot-last"></div>);

    return (
      <div className="topbar">
        <div id="topbar-inner">
          <NavLink to="/dashboard"><div id="logo"></div></NavLink>
          <div id="progress-bar">
            { pages }
          </div>
        </div>
      </div>
    );
  }
}