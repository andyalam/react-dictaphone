import React, { Component } from 'react';

export default class Clip extends Component {
  constructor() {
    super();
  }

  deleteButtonOnClick() {
    // TODO: delete clip, launch action
    //evtTgt = e.target;
    //evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
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
    const { blob } = this.props;
    const audioURL = window.URL.createObjectURL(blob);
    return (
      <article className="clip">
        <audio controls src={audioURL} />
        <p>clipnamehere</p>
        <button className="delete">Delete</button>
      </article>
    );
  }
}
