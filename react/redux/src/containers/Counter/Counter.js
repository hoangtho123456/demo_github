import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../Store/action';
class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 6" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>More result</button>
                <ul>
                    {this.props.storedResult.map(item => (
                        <li key={item.id} onClick={() => this.props.onDeleteResult(item.id)}>{item.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResult: state.res.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({
            type: actionTypes.INCREMENT
        }),
        onDecrementCounter: () => dispatch({
            type: actionTypes.DECREMENT
        }),
        onAddCounter: () => dispatch({
            type: actionTypes.ADD, val: 10
        }),
        onSubtractCounter: () => dispatch({
            type: actionTypes.SUBTRACT, val: 6
        }),
        onStoreResult: (result) => dispatch({
            type: actionTypes.STORE_RESULT,
            result: result
        }),
        onDeleteResult: (id) => dispatch({
            type: actionTypes.DELETE_RESULT, idElement: id
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
