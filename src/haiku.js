import React from 'react';

class Haiku extends React.Component {
  constructor(props) {
    super(props);
    this.animationEnded = this.animationEnded.bind(this);
  }
  render() {
    let animationClass;
    switch (this.props.animationState) {
    case "out":
      animationClass = "animate__animated animate__fadeOutLeft";
      break;
    case "in":
      animationClass = "animate__animated animate__fadeInRight";
      break;
    default: case "idle":
      animationClass = "";
    }
    return(
      <div className={"haiku" + ((animationClass) ? " " : "") + animationClass}
           onAnimationEnd={this.animationEnded}>
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

  animationEnded() {
    if (this.props.animationState === "in")
      this.props.gotoIdle(this.props.selection);
    if (this.props.animationState === "out")
      this.props.triggerUnmount(this.props.selection);
  }
}

export default Haiku;
