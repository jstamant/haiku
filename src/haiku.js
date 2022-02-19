import React from 'react';

class Haiku extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "haikus": [
        { "title": "Techs connect in a single try",
          "date": "2021-11-30 Tue 14:10",
          "content": ["A true tech connects", "to 15454 (fifteen-four-fifty-four)", "in a single try"]
        },
        { "title": "Firmware upgrades",
          "date": "2021-02-04 Thu 16:14",
          "content": ["Celebrate early:", "What could possibly go wrong", "with firmware upgrades?"]
        },
        { "title": "Lacerations",
          "date": "2020-12-10 Thu 09:33",
          "content": ["Moving heavy things", "like multicouplers beget", "a laceration."]
        },
        { "title": "Weekend",
          "date": "2020-12-04 Fri 16:23",
          "content": ["Approaching weekend:", "Thirty more minutes to go.", "Imminent freedom!"]
        },
        { "title": "Missing order number",
          "date": "2020-02-13 Thu 15:05",
          "content": ["No order number;", "Keeping me from completing", "time entry again. ☠"]
        },
        { "title": "Mandatory CBT",
          "date": "2019-12-18 Wed 08:25",
          "content": ["As an FYI,", "Vital issues CBT", "is mandatory."]
        },
        { "title": "Buzzwords",
          "date": "2019-12-09 Mon 13:00",
          "content": ["Executive Leadership.", "Enterprise-wide Corporate initiatives;", "Opportunities moving forward."]
        },
        { "title": "Two-pronged approach",
          "date": "2019-11-21 Thu 12:09",
          "content": ["Action-planning!", "Two-pronged approach...", "Action-planning simultaneously!"]
        }
      ]
    };
  }

  render() {
    return(
      <div id="haiku" onClick={this.nextHaiku}>
        <h1 className="title">{this.state.haikus[this.props.selection].title}</h1>
        <p>{this.state.haikus[this.props.selection].date}</p>
        <div id="content">
          <p>{this.state.haikus[this.props.selection].content[0]}</p>
          <p>{this.state.haikus[this.props.selection].content[1]}</p>
          <p>{this.state.haikus[this.props.selection].content[2]}</p>
        </div>
      </div>
    );
  }
}

export default Haiku;
