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
      selection: 1,
    };
    this.haikus = HaikuList;
    // Initially display the most recent haiku
    this.state.selection = this.haikus.length;
    // Or display the haiku as indicated by the query string, if valid
    const url = new URL(window.location.href);
    const haiku = parseInt(url.searchParams.get('id'));
    if (1 <= haiku && haiku <= this.haikus.length)
      this.state.selection = haiku;
    // Add the initially displayed haiku to the deck (for animation purposes)
    this.deck = [];
    this.deck.push(this.haikus[this.state.selection-1]);
    // And add a "state" property for animation
    this.deck[0].state = "fadeIn";

    // Bind functions that are used in events and/or callbacks
    this.changeHaiku = this.changeHaiku.bind(this);
  }

  render() {
    this.updateQueryString(this.state.selection);
    return(
      <>
        {this.deck.map((haiku) => {
          const fadeOut = (haiku.state == "fadeIn") ? false : true;
          return(
            <Haiku
              id="haiku"
              fadeOut={fadeOut}
              title={this.haikus[this.state.selection-1].title}
              date={this.haikus[this.state.selection-1].date}
              content={this.haikus[this.state.selection-1].content}
              selection={this.state.selection}
              total={this.haikus.length}
            />);
        })}
        <Interface changeHaiku={this.changeHaiku} />
      </>
    );
  }

  /* Commits the haiku selection by updating this component's state. Checks for
   * boundary conditions and prevents them.
   */
  setSelection(selection) {
    if (selection > this.haikus.length)
      selection = this.haikus.length;
    if (selection <= 0)
      selection = 1;
    this.deck.push(
      <Haiku
        id="haiku"
        title={this.haikus[selection-1].title}
        date={this.haikus[selection-1].date}
        content={this.haikus[selection-1].content}
        selection={selection}
        total={this.haikus.length}
      />);
    // this.deck.shift();
    this.setState({selection: selection});
  }

  /* Changes displayed haiku to the next haiku, to the previous haiku, or to a
   * random haiku.
   */
  changeHaiku(command="next") {
    let newSelection;
    switch (command) {
    default: case "next":
      newSelection = this.state.selection + 1;
      this.setSelection(this.state.selection + 1);
      break;
    case "previous":
      newSelection = this.state.selection - 1;
      break;
    case "random":
      do {
        // Prevent the currently displayed haiku from being selected again
        newSelection = Math.floor(Math.random() * this.haikus.length) + 1;
      } while (newSelection === this.state.selection);
      break;
    }
    this.setSelection(newSelection);
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
