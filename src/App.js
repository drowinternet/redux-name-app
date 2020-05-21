import React from 'react';
import { connect } from "react-redux";
import {
  setName,
  addName,
  handleChange,
  onReset
} from "./state/action";
import './App.css';

class App extends React.Component {

  componentDidMount() {
    this.props.setName();
  }

  render() {
    const {
      value,
      loading,
      description,
      addName,
      handleChange,
      onReset
    } =this.props;
    return (
      <div className="App">
        <p>This is the value: {loading ? (<span>{' Loading...'} </span>) : (<span>{' ' + value}</span>)}</p>
        <p>This is the value: {loading ? (<span>{' Loading...'} </span>) : (<span>{' ' + description}</span>)}</p>
        <form onSubmit={addName} > 
          <input type="text" placeholder="Type a Name!" value={value} onChange={handleChange} disabled={loading ? true : false}/>
          <button type="submit" disabled={loading ? true : false}>Name</button>
        </form>
        <button onClick={onReset} disabled={loading ? true : false}>Reset</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    value: state.value,
    loading: state.loading,
    description: state.description.item
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: () => dispatch(setName()),
    addName: e => {
      e.preventDefault();
      dispatch(addName())
    },
    handleChange: e => {
      const value = e.target.value
      dispatch(handleChange(value))
    },
    onReset: () => dispatch(onReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
