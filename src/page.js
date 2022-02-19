import React from 'react';

import Button from './button';
import Counter from './counter';
import Haiku from './haiku';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "selection": 0
    };
    // Bind functions that are used in events and/or callbacks
    this.nextHaiku = this.nextHaiku.bind(this);
    this.previousHaiku = this.previousHaiku.bind(this);
  }

  render() {
    return(
      <div>
        <Haiku selection={this.state.selection} />
        <Counter selection={this.state.selection}/>
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
