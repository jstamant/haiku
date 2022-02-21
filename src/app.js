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

  changeHaiku(next=true) {
    const direction = next ? 1 : -1;
    this.setState({selection: this.state.selection + direction});
  }

  // TODO need to make sure you don't select the same haiku
  randomHaiku() {
    const newSelection = Math.floor(Math.random() * this.state.total);
    console.log(newSelection);
    this.setState({selection: newSelection});
  }
}

export default App;
