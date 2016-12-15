import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteClip } from '../actions/index';

class Clip extends Component {
  constructor() {
    super();
    this.deleteButtonOnClick = this.deleteButtonOnClick.bind(this);
    this.clipLabelOnClick = this.clipLabelOnClick.bind(this);
  }

  deleteButtonOnClick() {
    this.props.deleteClip(this.props.id);
  }

  clipLabelOnClick() {
    // TODO: update clip name
    //var existingName = clipLabel.textContent;
    //var newClipName = prompt('Enter a new name for your sound clip?');
    //if(newClipName === null) {
    //  clipLabel.textContent = existingName;
    //} else {
    //  clipLabel.textContent = newClipName;
    //}
  }

  render() {
    const { blob, clipName } = this.props;
    const audioURL = window.URL.createObjectURL(blob);
    return (
      <article className="clip">
        <audio controls src={audioURL} />
        <p>{clipName}</p>
        <button className="delete" onClick={this.deleteButtonOnClick}>Delete</button>
      </article>
    );
  }
}

export default connect(null, { deleteClip })(Clip);
