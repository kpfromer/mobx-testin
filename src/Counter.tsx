import React, { Component, Fragment } from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import Devtools from 'mobx-react-devtools';

const appState = observable({
  count: 0,
  increment: function () {
    this.count++;
  },
  decrement: function() {
    this.count--;
  }
});

@observer class Counter extends Component<any> {
  render() {
    return (
      <Fragment>
        <Devtools />
        <span>{this.props.store.count}</span>
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
      </Fragment>
    );
  }

  handleInc = () => {
    this.props.store.increment();
  }

  handleDec = () => {
    this.props.store.decrement();
  }
}

export default () => <Counter store={appState} />