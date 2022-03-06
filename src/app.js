import React from 'react';

import Haiku from './haiku';
import Interface from './interface';

import HaikuList from './haikulist';
const haikuList = HaikuList;

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state.selection is the number of the selected haiku. Its array index
    // is selection - 1
    this.state = {
      selection: 1,
      inTransition: false,
      deck: []
    };
    // Initially display the most recent haiku
    this.state.selection = haikuList.length;
    // Or display the haiku as indicated by the query string, if valid
    const url = new URL(window.location.href);
    const haiku = parseInt(url.searchParams.get('id'));
    if (1 <= haiku && haiku <= haikuList.length)
      this.state.selection = haiku;

    // Bind functions that are used in events and/or callbacks
    this.changeHaiku = this.changeHaiku.bind(this);
    this.unmountHaiku = this.unmountHaiku.bind(this);
    this.idleHaiku = this.idleHaiku.bind(this);
  }

  render() {
    this.updateQueryString(this.state.selection);
    return(
      <>
        {this.state.deck.map((haiku, index) => {
          return(
            <Haiku
              key={index}
              animationState={haiku.state}
              gotoIdle={this.idleHaiku}
              triggerUnmount={this.unmountHaiku}
              title={haiku.title}
              date={haiku.date}
              content={haiku.content}
              selection={haiku.number}
              total={haikuList.length}
            />);
        })}
        <Interface changeHaiku={this.changeHaiku} />
      </>
    );
  }

  /* Adds a haiku to the app's deck of haikus. Takes an index, which determines
   * which haiku in the HaikuList to add into the deck.
   * Then, triggers the removal of the previous haiku.
   * Remember, haiku #1 is index [0]
   */
  addHaiku(index) {
    let newDeck = [...this.state.deck];
    // Add the initially displayed haiku to the deck (for animation purposes)
    // Pushing to the front to prevent from re-animating when it gets moved in the DOM
    newDeck.unshift(haikuList[index]);
    // Add some properties that aren't included from the HaikuList
    newDeck[0].state = "in"; // Added for tracking the animation
    newDeck[0].number = index+1;
    // Trigger removal of all previous haikus, which will be unmounted after
    // their animation
    newDeck.forEach((haiku) => {
      if (haiku.number !== index+1) haiku.state = "out";});
    this.setState({deck: newDeck, selection: index+1, inTransition: true});
  }

  /* Changes displayed haiku to the next haiku, to the previous haiku, or to a
   * random haiku. Then, prevents boundary conditions from occurring.
   */
  changeHaiku(command="next") {
    // Do not change haiku if currently flipping/animating between a pair
    if (this.state.inTransition) return;
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
        newSelection = Math.floor(Math.random() * haikuList.length) + 1;
      } while (newSelection === this.state.selection);
    }
    // Prevent boundary conditions, and
    // only add a haiku if we're flipping to a new one
    if (newSelection > haikuList.length) {
      newSelection = haikuList.length; return; }
    if (newSelection <= 0) {
      newSelection = 1; return; }
    this.addHaiku(newSelection-1);
  }

  /* Overloading the React component method for App.js
   * Add the initially displayed haiku to the deck once the app is loaded.
   * For animation purposes.
   */
  componentDidMount() {
    this.addHaiku(this.state.selection-1);
  }

  /* Sets the state of a haiku that has faded-out to be unmounted.
   * Takes a haiku number to determine which haiku to remove.
   */
  unmountHaiku(number) {
    let newDeck = this.state.deck.filter((haiku) => {
      return haiku.number !== number;});
    this.setState({deck: newDeck});
  }

  /* Changes the animation state of a haiku in the deck to "idle".
   * Takes a haiku number to determine which haiku to idle.
   * Then readies the app for flipping to the next haiku.
   */
  idleHaiku(number) {
    let newDeck = [...this.state.deck];
    newDeck.forEach((haiku) => {
      if (haiku.number === number) haiku.state = "idle";});
    this.setState({deck: newDeck, inTransition: false});
  }

  /* Update the URL in the browser so that its query string matches the
   * displayed haiku.
   */
  updateQueryString(id) {
    // Using the window.history object allows us to prevent a reload upon
    // changing the query string the way that the window.location object does.
    let path = window.location.pathname + '?id=' + id;
    window.history.pushState(null, '', path);
  }
}

export default App;
