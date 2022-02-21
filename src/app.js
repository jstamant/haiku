import React from 'react';

import Haiku from './haiku';
import Interface from './interface';

import HaikuList from './haikulist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haikus: HaikuList,
      selection: 0,
      total: 0
    };
    this.state.total = this.state.haikus.length;
    // Bind functions that are used in events and/or callbacks
    this.changeHaiku = this.changeHaiku.bind(this);
    this.randomHaiku = this.randomHaiku.bind(this);
  }

  render() {
    const title = this.state.haikus[this.state.selection].title;
    const date = this.state.haikus[this.state.selection].date;
    const content = this.state.haikus[this.state.selection].content;
    return(
      <>
        <Haiku
          title={title}
          date={date}
          content={content}
          selection={this.state.selection}
          total={this.state.total}
        />
        <Interface changeHaiku={this.changeHaiku} randomHaiku={this.randomHaiku}>TEST</Interface>
      </>
    );
  }

  setSelection(selection) {
    this.setState({selection: selection});
  }

  changeHaiku(next=true) {
    this.setSelection(this.state.selection + (next ? 1 : -1));
  }

  randomHaiku() {
    let newSelection = Math.floor(Math.random() * this.state.total);
    // Prevent the selection of the currently displayed haiku
    while (newSelection === this.state.selection)
      newSelection = Math.floor(Math.random() * this.state.total);
    this.setSelection(newSelection);
  }
}

export default App;
