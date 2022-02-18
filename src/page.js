import React from 'react';

class Page extends React.Component {
  render() {
    return(
      <div>
        <h1 id="title">HAIKU TITLE</h1>
        <div id="content">
        <p>Sample content</p>
        <p>Second Line</p>
        <p>Last line</p>
        </div>
        <p id="counter">Haiku 1/13</p>
        <button id="next">Next</button>
        <button id="previous">Previous</button>
        <button id="random">Random Haiku</button>
      </div>
    );
  }
}

export default Page;
