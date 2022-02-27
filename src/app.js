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
      deck: []
    };
    // TODO make this CONST
    this.haikus = HaikuList;
    // Initially display the most recent haiku
    this.state.selection = this.haikus.length;
    // Or display the haiku as indicated by the query string, if valid
    const url = new URL(window.location.href);
    const haiku = parseInt(url.searchParams.get('id'));
    if (1 <= haiku && haiku <= this.haikus.length)
      this.state.selection = haiku;

    // Bind functions that are used in events and/or callbacks
    this.changeHaiku = this.changeHaiku.bind(this);
    this.animationEnd = this.animationEnd.bind(this);
  }

  render() {
    this.updateQueryString(this.state.selection);
    return(
      <>
        {this.state.deck.map((haiku) => {
          const fadeOut = (haiku.state == "fadeIn") ? false : true;
          return(
            <Haiku
              fadeOut={fadeOut}
              animationEnd={this.animationEnd}
              title={haiku.title}
              date={haiku.date}
              content={haiku.content}
              selection={haiku.number}
              total={this.haikus.length}
            />);
        })}
        <Interface changeHaiku={this.changeHaiku} />
      </>
    );
  }

  /*
   * Adds a haiku to the app's deck of haikus. Takes an index, which determines
   * which haiku in the HaikuList to add into the deck.
   * Then, triggers the removal of the previous haiku.
   */
  addHaiku(index) {
    let newDeck = this.state.deck.slice();
    // Add the initially displayed haiku to the deck (for animation purposes)
    const length = newDeck.push(this.haikus[index]);
    // Add some properties that aren't included from the HaikuList
    newDeck[length-1].state = "fadeIn"; // Added for tracking the animation
    newDeck[length-1].number = index+1;
    // Trigger removal of the previous haiku, which will be unmounted after its
    // animation
    if (length > 1) // (No haiku to remove if it's the first one being added)
      newDeck[0].state = "fadeOut";
    this.setState({deck: newDeck,
                   selection: index+1});
  }

  /*
   * Sets the state of a haiku that has faded-out to be unmounted. Requires an
   * index to determine which haiku in the deck to remove.
   */
  animationEnd(index) {
    let newDeck = this.state.deck;
    // newDeck.splice(index, 1);
    newDeck.shift();
    this.setState(newDeck);
  }

  /* Changes displayed haiku to the next haiku, to the previous haiku, or to a
   * random haiku.
   */
  changeHaiku(command="next") {
    let newSelection;
    switch (command) {
    default: case "next":
      newSelection = this.state.selection + 1;
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

  componentDidMount() {
    // Add the initially displayed haiku to the deck (for animation purposes)
    this.addHaiku(this.state.selection-1);
  }

  /* Commits the haiku selection by updating this component's state. Checks for
   * boundary conditions and prevents them.
   * TODO REMOVE this function
   */
  setSelection(selection) {
    if (selection > this.haikus.length)
      selection = this.haikus.length;
    if (selection <= 0)
      selection = 1;
    this.addHaiku(selection-1);
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
