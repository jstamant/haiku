import React from 'react';

import Haiku from './haiku';
import Interface from './interface';

import HaikuList from './haikulist';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state.selection is the number of the selected haiku. Its array index
    // is selection - 1
    this.state = {
      haikus: HaikuList,
      selection: 1,
      total: 0
    };
    this.state.total = this.state.haikus.length;
    // Initially display the most recent haiku
    this.state.selection = this.state.total;
    // Or display the haiku as indicated by the query string, if valid
    const url = new URL(window.location.href);
    const haiku = parseInt(url.searchParams.get('id'));
    if (1 <= haiku && haiku <= this.state.total)
      this.state.selection = haiku;

    // Bind functions that are used in events and/or callbacks
    this.changeHaiku = this.changeHaiku.bind(this);
  }

  render() {
    this.updateQueryString(this.state.selection);
    const title = this.state.haikus[this.state.selection-1].title;
    const date = this.state.haikus[this.state.selection-1].date;
    const content = this.state.haikus[this.state.selection-1].content;
    return(
      <>
        <Haiku
          title={title}
          date={date}
          content={content}
          selection={this.state.selection-1}
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
    if (selection > this.state.total)
      selection = this.state.total;
    if (selection <= 0)
      selection = 1;
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

  /* Update the URL in the browser so that its query string matches the
   * displayed haiku.
   */
  updateQueryString(id) {
    // Using the window.history object allows us to prevent a reload upon
    // changing the query string the way that the window.location object does.
    let path = window.location.pathname + '?' + 'id=' + id;
    window.history.pushState(null, '', path);
  }
}

export default App;
