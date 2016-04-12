const { createClass  } = React;

const ChordBuilder = createClass({
  render() {
    return (
      <div>
        <ChordBuilderHeader/>
        <ChordBuilderBody/>
      </div>
    );
  }
});

const ChordBuilderHeader = createClass({
  render() {
    return (
      <div className="row">
        <div className="columns medium-6 medium-centered">
          <h1 className="text-center">Chord Builder</h1>
          <p>
            FYI: I probably only work on relatively recent versions of
            <strong>Google Chrome</strong>.
          </p>
          <hr/>
        </div>
      </div>
    );
  }
});

const ChordBuilderBody = createClass({
  render() {
    return (
      <div>
        <div className="row">
          <div className="columns medium-10 medium-centered">
            <ChordBuilderButton icon="plus" text="Add Note"/>
            <ChordBuilderButton icon="pause" text="Pause All"/>
            <ChordBuilderButton icon="play" text="Play All"/>
            <ChordBuilderButton icon="save" text="Save"/>
          </div>
        </div>
        <div className="row">
          <div className="piano-keyboard columns medium-12">
            <Isvg src="piano.svg">
              Please use Google Chrome or something that supports SVG
            </Isvg>
          </div>
        </div>
      </div>
    );
  }
});

const ChordBuilderButton = createClass({
  handleClick() {
    alert('todo');
  },

  iconClass() {
    return 'fa fa-' + this.props.icon;
  },

  render() {
    return (
      <div className="column medium-3">
        <button className="button" onClick={this.hanldleClick}>
          <i className={this.iconClass()}></i> {this.props.text}
        </button>
      </div>
    );
  }
});

ReactDOM.render(
  <ChordBuilder></ChordBuilder>,
  document.getElementById('container')
);
