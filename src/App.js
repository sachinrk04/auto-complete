import React, { Component } from 'react'

import Headers from './components/header/Header';
import './App.css';
import axios from 'axios';
import AutoComplete from './components/autoComplete/AutoComplete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      name: "",
      email: "",
      interests: "",
      selectedList: []
    }
  };

  getData = (value) => {
    const url = `https://webit-keyword-search.p.rapidapi.com/autosuggest?q=${value}&language=en`;
    const key = '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7';
    axios.get(url, { headers: { 'x-rapidapi-key': key} })
      .then((res) => {
        if (res.status === 200 && res.data.status === "success") {
          this.setState({
            data: res.data.data.results
          })
        }
      })
      .catch((error) => {
        console.log("GET-ERROR--->", error)
      })
  };

  changeHandler = (e) => {
    const {name, value} = e.target;
    if (name === "interests") {
      this.setState({ 
        "interests": value 
      }, () => {
        if (this.state.interests === "" || this.state.interests.length <= 2) {
          this.setState({
            data: []
          })
        }
        if(this.state.interests.length >= 3) {
          this.getData(this.state.interests)
        }
      })
    } else {
      this.setState({
        [name]: e.target.value
      })
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    const {name, email, selectedList} = this.state;
    const interestsData = selectedList.toString();
    const formData = {
      name: name,
      email: email,
      interests: interestsData
    }
    const url = 'https://testpostapi1.p.rapidapi.com/testBatmanApi/name/register';
    const key = '28728db04dmsh34d3f140dd059fap1c388ejsn7288577afcf7';
    axios.post(url, formData, { headers: { 'x-rapidapi-key': key} })
      .then((res) => {
        console.log("RES---->", res)
        if (res.status === 200) {
          this.setState({
            name: "",
            email: "",
            selectedList: []
          })
        }
      })
      .catch((error) => {
        console.log("POST-ERROR--->", error)
      })
  }

  suggestionSelected = (value) => {
    const items = this.state.selectedList;
    const updatedList = [...items, value]
    this.setState(() => ({
        interests: "",
        selectedList: updatedList,
        data: [],
    }));
  }

  removeValue = (value) => {
    const items = this.state.selectedList;
    const filterItems = items.filter((item) => item !== value);
    this.setState({
      selectedList: filterItems
    })
  }

  renderSuggestions = (data) => {
    return (
      <div className="auto-complete-text">
        <ul>
          {data.map(item => <li onClick={() => this.suggestionSelected(item)} key={item}>{item}</li>)}
        </ul>
      </div>
    )
  }

  render() {
    const {data, selectedList} = this.state;
    return (
      <div>
        <Headers />
        <div className="register-page">
          <div className="register-form">
            <h3 className="register-header">Register</h3>
            <form onSubmit={this.submitHandler}>
              <div className="input-fields">
                <div className="input-field">
                  <input 
                    className="input" 
                    name="name"
                    value={this.state.name}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="input-field">
                  <input 
                    className="input" 
                    name="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="input-field ">
                  <AutoComplete 
                    interests={this.state.interests}
                    data={data}
                    selectedList={selectedList}
                    changeHandler={this.changeHandler}
                    suggestionSelected={this.suggestionSelected}
                    removeValue={this.removeValue}
                  />
                </div>
              </div>
              <button className="btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default App;