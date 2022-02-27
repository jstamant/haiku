import React from 'react';

class Haiku extends React.Component {
  constructor(props) {
    super(props);
    this.triggerUnmount = this.triggerUnmount.bind(this);
  }
  render() {
    // TODO need to remove fadeInRight after it animates, so it doesn't trigger
    // again when the element moves in the DOM due to the way I store them in an
    // array
    return(
      <div className=
             {(this.props.fadeOut) ?
              "haiku animate__animated animate__fadeOutLeft" :
              "haiku animate__animated animate__fadeInRight" }
           onAnimationEnd={this.triggerUnmount}>
        <h1 className="title">{this.props.title}</h1>
        <div className="content">
          <p>{this.props.content[0]}</p>
          <p>{this.props.content[1]}</p>
          <p>{this.props.content[2]}</p>
        </div>
        <div className="signature">
          <div className="counter">{this.props.selection}/{this.props.total}</div>
          <div className="date">{this.props.date}</div>
          <div className="author">Justin St-Amant</div>
        </div>
      </div>
    );
  }

  triggerUnmount() {
    if (this.props.fadeOut)
      this.props.animationEnd(this.props.selection-1);
  }
}

export default Haiku;
