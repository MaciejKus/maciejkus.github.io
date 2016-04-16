/*
LoremPage
 - LoremButtons
   - Button
 - LoremOptions
   - Paragraphs
   - CheckOptions
 - LoremOutput
   - AuthorPhoto //image of political writer
   - OutputBox
*/

var LoremButtons = React.createClass({
  displayName: 'LoremButtons',

  render: function () {
    var authors = this.props.data.map(function (auth, i) {
      return React.createElement(Button, {
        auth: auth,
        index: i,
        handleButton: this.props.handleButton,
        key: auth.author
      });
    }, this);
    return React.createElement(
      'div',
      { className: 'buttonsContainer' },
      authors
    );
  }
});

var Button = React.createClass({
  displayName: 'Button',

  handleThisButton: function () {
    this.props.handleButton(this.props.index);
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'authorButton', onClick: this.handleThisButton },
      this.props.auth.author
    );
  }
});

var LoremOptions = React.createClass({
  displayName: 'LoremOptions',

  render: function () {
    return React.createElement(
      'div',
      { className: 'loremOptions' },
      React.createElement(LoremLength, {
        paragraphs: this.props.paragraphs,
        lines: this.props.lines,
        chars: this.props.chars,
        lengthCheck: this.props.lengthCheck
      }),
      React.createElement(CheckOptions, {
        ptag: this.props.ptag,
        ptagCheck: this.props.ptagCheck,
        brtag: this.props.brtag,
        brtagCheck: this.props.brtagCheck
      })
    );
  }
});

var LoremLength = React.createClass({
  displayName: 'LoremLength',

  lengthCheckIt: function () {
    this.props.lengthCheck(this.refs.paragraphs.value, this.refs.lines.value, this.refs.chars.value);
  },
  render: function () {
    return React.createElement(
      'div',
      { className: 'parOptions' },
      React.createElement(
        'label',
        { htmlFor: 'paragraphs' },
        'Paragraphs:'
      ),
      React.createElement('input', {
        type: 'number',
        ref: 'paragraphs',
        onChange: this.lengthCheckIt,
        defaultValue: this.props.paragraphs,
        name: 'paragraphs' }),
      ' ',
      React.createElement('p', null),
      React.createElement(
        'label',
        { htmlFor: 'lines' },
        'Lines/Paragraphs:'
      ),
      React.createElement('input', {
        type: 'number',
        ref: 'lines',
        onChange: this.lengthCheckIt,
        defaultValue: this.props.lines,
        name: 'lines' }),
      ' ',
      React.createElement('p', null),
      React.createElement(
        'label',
        { htmlFor: 'chars' },
        'Characters/Line:'
      ),
      React.createElement('input', {
        type: 'number',
        ref: 'chars',
        onChange: this.lengthCheckIt,
        defaultValue: this.props.chars,
        name: 'chars' }),
      React.createElement('p', null)
    );
  }
});

var CheckOptions = React.createClass({
  displayName: 'CheckOptions',

  checkPtag: function () {
    this.props.ptagCheck(this.refs.ptag.checked);
  },
  checkBRtag: function () {
    this.props.brtagCheck(this.refs.brtag.checked);
  },
  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement('input', {
        type: 'checkbox',
        name: 'p-tags',
        ref: 'ptag',
        defaultChecked: this.props.ptag,
        onChange: this.checkPtag
      }),
      React.createElement(
        'label',
        { htmlFor: 'p-tags' },
        'Add <p> tags'
      ),
      React.createElement('br', null),
      React.createElement('input', {
        type: 'checkbox',
        name: 'br-tags',
        ref: 'brtag',
        defaultChecked: this.props.brtag,
        onChange: this.checkBRtag
      }),
      React.createElement(
        'label',
        { htmlFor: 'br-tags' },
        'Add <br> tags'
      )
    );
  }
});

var LoremOutput = React.createClass({
  displayName: 'LoremOutput',

  render: function () {
    return React.createElement(
      'div',
      null,
      React.createElement(OutputBox, {
        text: this.props.auth.text,
        chars: this.props.chars,
        lines: this.props.lines,
        paragraphs: this.props.paragraphs
      }),
      React.createElement('p', null),
      React.createElement(AuthorPhoto, { imgURL: this.props.auth.imgURL })
    );
  }
});
var AuthorPhoto = React.createClass({
  displayName: 'AuthorPhoto',

  render: function () {
    return React.createElement('img', { src: this.props.imgURL });
  }
});

var OutputBox = React.createClass({
  displayName: 'OutputBox',

  render: function () {
    return React.createElement('textarea', {
      cols: this.props.chars,
      rows: (1 + parseInt(this.props.lines)) * this.props.paragraphs,
      value: this.props.text
    });
  }
});

var LoremPage = React.createClass({
  displayName: 'LoremPage',

  getInitialState: function () {
    return {
      selectedIndex: 0,
      paragraphs: 3,
      lines: 5,
      chars: 80,
      ptag: false,
      brtag: false
    };
  },
  handlePtagCheck: function (p) {
    this.setState({
      ptag: p
    });
    //    this.updateQuotes();
  },
  handleBRtagCheck: function (br) {
    this.setState({
      brtag: br
    });
    //    this.updateQuotes();
  },
  handleLengthCheck: function (par, line, chars) {
    this.setState({
      paragraphs: par,
      lines: line,
      chars: chars
    });
    //    this.updateQuotes();
  },
  updateQuotes: function () {
    app.updateQuotes(this.state.paragraphs, this.state.lines, this.state.chars, this.state.ptag, this.state.brtag, this.state.selectedIndex);
  },
  handleButton: function (i) {
    this.setState({
      selectedIndex: i
    });
    //    this.updateQuotes();
  },
  render: function () {
    var selectedAuthor = this.props.data[this.state.selectedIndex];
    app.updateQuotes(this.state.paragraphs, this.state.lines, this.state.chars, this.state.ptag, this.state.brtag, this.state.selectedIndex);
    return React.createElement(
      'div',
      null,
      React.createElement(LoremButtons, {
        data: this.props.data,
        selected: selectedAuthor,
        handleButton: this.handleButton
      }),
      React.createElement(LoremOptions, {
        paragraphs: this.state.paragraphs,
        lines: this.state.lines,
        chars: this.state.chars,
        ptag: this.state.ptag,
        brtag: this.state.brtag,
        ptagCheck: this.handlePtagCheck,
        brtagCheck: this.handleBRtagCheck,
        lengthCheck: this.handleLengthCheck
      }),
      React.createElement(LoremOutput, {
        auth: selectedAuthor
        //4 or 0 to account for <br> tags or not
        , chars: parseInt(this.state.chars) + (this.state.brtag ? 4 : 0),
        lines: this.state.lines,
        paragraphs: this.state.paragraphs
      })
    );
  }
});

ReactDOM.render(React.createElement(LoremPage, { data: app.data }), document.getElementById('content'));