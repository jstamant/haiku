import React from 'react';

import Button from './button';
import Counter from './counter';
import Haiku from './haiku';

import HaikuList from './haikulist';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haikus: HaikuList,
      selection: 0,
      total: 0
    };
    this.state.total = this.state.haikus.length;
    // Bind functions that are used in events and/or callbacks
    this.nextHaiku = this.nextHaiku.bind(this);
    this.previousHaiku = this.previousHaiku.bind(this);
  }

  render() {
    const title = this.state.haikus[this.state.selection].title;
    const date = this.state.haikus[this.state.selection].date;
    const content = this.state.haikus[this.state.selection].content;
    return(
      <div>
        <Haiku title={title} date={date} content={content} />
        <Counter selection={this.state.selection} total={this.state.total} />
        <button onClick={this.nextHaiku}>NEXT</button>
        <button onClick={this.previousHaiku}>PREVIOUS</button>
        <Button id="next" />
        <Button id="previous" />
        <Button id="random" />
      </div>
    );
  }

  nextHaiku() {
    this.setState({selection: this.state.selection + 1});
  }
  previousHaiku() {
    this.setState({selection: this.state.selection - 1});
  }
}

export default Page;
