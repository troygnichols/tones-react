const { createClass  } = React;

let NextNoteId = 4;

const ChordBuilder = createClass({
  getInitialState() {
    return {
      notes: [
        {
          id: 1,
          pitch: 'C',
          mod: 'natural',
          octave: 4,
          waveform: 'triangle',
          isPlaying: false,
          volume: 0.5
        }, {
          id: 2,
          pitch: 'A',
          mod: 'flat',
          octave: 4,
          waveform: 'sine',
          isPlaying: true,
          volume: 0.25
        }, {
          id: 3,
          pitch: 'F',
          mod: 'natural',
          octave: 4,
          waveform: 'square',
          isPlaying: false,
          volume: 0.75
        }
      ]
    };
  },

  handleNotesChanged(notes) {
    this.setState({
      notes
    });
  },

  render() {
    return (
      <div>
        <ChordBuilderHeader/>
        <ChordBuilderBody notes={this.state.notes} onNotesChanged={this.handleNotesChanged}/>
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
  handleNoteChanged(note) {
    this.props.onNotesChanged(
      this.props.notes.map((prevNote) => {
        if (prevNote.id === note.id) {
          return note;
        }
        return prevNote;
      })
    );
  },

  handleAddNote() {
    this.props.onNotesChanged(
      [...this.props.notes, {
        id: NextNoteId++,
        pitch: 'C',
        mod: 'natural',
        waveform: 'sine',
        octave: 4,
        volume: 0.5,
        isPlaying: false
      }]
    );
  },

  handleDeleteNote(delNote) {
    this.props.onNotesChanged(
      this.props.notes.filter((note) => {
        return note.id !== delNote.id;
      })
    );
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="columns medium-10 medium-centered">
            <ChordBuilderButton icon="plus" text="Add Note"
              onClickAction={this.handleAddNote}/>
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
        <div className="row">
          <ChordBuilderNotes
            notes={this.props.notes}
            onNoteChanged={this.handleNoteChanged}
            onDeleteNote={this.handleDeleteNote}
          />
        </div>
      </div>
    );
  }
});

const ChordBuilderNotes = createClass({
  render() {
    let notes = this.props.notes.map((note) => {
      return (
        <ChordBuilderNote
          key={note.id}
          note={note}
          onNoteChanged={this.props.onNoteChanged}
          onDeleteNote={this.props.onDeleteNote}
        />
      );
    });
    return (
      <div>
        <div className="row">
          <div className="column medium-1">
            <label>Pitch</label>
          </div>
          <div className="column medium-1">
            <label>Mod</label>
          </div>
          <div className="column medium-2">
            <label>Waveform</label>
          </div>
          <div className="column medium-1">
            <label>Octave</label>
          </div>
          <div className="column medium-2">
            <label>Frequency</label>
          </div>
          <div className="column medium-1">
            <label>On/Off</label>
          </div>
          <div className="column medium-2">
            <label>Volume</label>
          </div>
          <div className="column medium-2">
          </div>
        </div>
        {notes}
      </div>
    );
  }
});

const ChordBuilderNote = createClass({
  handleChange() {
    let note = {
      id: this.props.note.id
    };
    ['pitch', 'mod', 'octave', 'waveform', 'isPlaying', 'volume'].forEach((attr) => {
      let node = this.refs[attr];
      note[attr] = node.type === 'checkbox' ? node.checked : node.value;
    });
    this.props.onNoteChanged(note);
  },

  handleDeleteNote() {
    this.props.onDeleteNote(this.props.note);
  },

  render() {
    const { note } = this.props;
    return (
      <div className="row">
        <div className="column medium-1">
          <select ref="pitch" value={note.pitch} onChange={this.handleChange}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </div>
        <div className="column medium-1">
          <select ref="mod" value={note.mod} onChange={this.handleChange}>
            <option value="natural">♮</option>
            <option value="flat">♭</option>
            <option value="sharp">♯</option>
          </select>
        </div>
        <div className="column medium-2">
          <select ref="waveform" value={note.waveform} onChange={this.handleChange}>
            <option value="sine">sine</option>
            <option value="square">square</option>
            <option value="sawtooth">sawtooth</option>
            <option value="triangle">triangle</option>
          </select>
        </div>
        <div className="column medium-1">
          <input ref="octave" type="number" value={note.octave} onChange={this.handleChange}/>
        </div>
        <div className="column medium-2">
          <input readOnly={true} type="text" value={freq(note)}/>
        </div>
        <div className="column medium-1">
          <input ref="isPlaying" type="checkbox" checked={note.isPlaying} onChange={this.handleChange}/>
        </div>
        <div className="column medium-2">
          <input ref="volume" max="1" min="0" step="0.01" type="range" value={note.volume}
            onChange={this.handleChange}/>
        </div>
        <div className="column medium-2">
          <ChordBuilderDeleteNoteButton onDeleteNote={this.handleDeleteNote}/>
        </div>
      </div>
    );
  }
});

const ChordBuilderDeleteNoteButton = createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.onDeleteNote();
  },

  render() {
    return (
      <button className="button alert" onClick={this.handleClick}>
        <i className="fa fa-times"></i> Delete
      </button>
    );
  }
});

const ChordBuilderButton = createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.onClickAction();
  },

  iconClass() {
    return 'fa fa-' + this.props.icon;
  },

  render() {
    return (
      <div className="column medium-3">
        <button className="button" onClick={this.handleClick}>
          <i className={this.iconClass()}></i> {this.props.text}
        </button>
      </div>
    );
  }
});

const freq = (note) => {
  // see https://en.wikipedia.org/wiki/Piano_key_frequencies
  let dist = distFromA(note);
  let moves = Math.abs(dist);
  let freq = 440; // start form A4 (440Hz)
  let multiplier = 1.059463094359295;
  for (let i=0; i < moves; i++) {
    if (dist >= 0) {
      // moving up from A4, multiply
      freq = freq * multiplier;

    } else {
      // moving down from A4, divide
      freq = freq / multiplier;
    }
  }
  let octaveFactor = Math.pow(2, (note.octave - 4));
  return freq * octaveFactor;
};

const distFromA = (note) => {
  let pitch = note.pitch.toLowerCase();
  let pitchNum = pitchToNumberMap[pitch];
  switch (note.mod) {
    case 'sharp':
      return pitchNum + 1;
    case 'flat':
      return pitchNum - 1;
    default:
      return pitchNum;
  }
}

const pitchToNumberMap = {
  a: 0,
  b: 2,
  c: 3,
  d: 5,
  e: 7,
  f: 8,
  g: 10
};

ReactDOM.render(
  <ChordBuilder></ChordBuilder>,
  document.getElementById('container')
);
