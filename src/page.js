import React from 'react';

import Counter from './counter';
import Haiku from './haiku';
import Interface from './interface';

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
    this.changeHaiku = this.changeHaiku.bind(this);
  }

  render() {
    const title = this.state.haikus[this.state.selection].title;
    const date = this.state.haikus[this.state.selection].date;
    const content = this.state.haikus[this.state.selection].content;
    return(
      <>
        <Haiku title={title} date={date} content={content} />
        <Counter selection={this.state.selection} total={this.state.total} />
        <Interface changeHaiku={this.changeHaiku}>TEST</Interface>
      </>
    );
  }

  changeHaiku(next=true) {
    const direction = next ? 1 : -1;
    this.setState({selection: this.state.selection + direction});
  }
}

export default Page;
