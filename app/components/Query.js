import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions.js';

let Query = React.createClass({
  componentDidMount() {
    this.props.dispatch(getGraph("{breakings(id: 2) {id, character, actor, role, traits}}"));
  },
  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    let breakings = this.props.store.get('data').toObject();
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <h3>{ breakings.character }</h3>
        <p>{ breakings.actor }</p>
        <p>{ breakings.role }</p>
        <p>{ breakings.traits }</p>
        <input ref={node => {queryText = node}}></input>
        <button onClick={() => {dispatch(getGraph(queryText.value))}}>
          query
        </button>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
