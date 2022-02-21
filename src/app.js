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
        <Interface changeHaiku={this.changeHaiku}>TEST</Interface>
      </>
    );
  }

  /* Commits the haiku selection by updating this component's state. Checks for
   * boundary conditions and prevents them.
   */
  setSelection(selection) {
    if (selection >= this.state.total)
      selection = this.state.total - 1;
    if (selection < 0)
      selection = 0;
    this.setState({selection: selection});
  }

  /* Changes displayed haiku to the next haiku, to the previous haiku, or to a
   * random haiku.
   */
  changeHaiku(command="next") {
    switch (command) {
    default: case "next":
      this.setSelection(this.state.selection + 1);
      break;
    case "previous":
      this.setSelection(this.state.selection - 1);
      break;
    case "random":
      let newSelection = Math.floor(Math.random() * this.state.total);
      // Prevent the selection of the currently displayed haiku
      while (newSelection === this.state.selection)
        newSelection = Math.floor(Math.random() * this.state.total);
      this.setSelection(newSelection);
      break;
    }
  }
}

export default App;
