import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: '',
      username: '',
      password: '',
      favorites: [],
      favInput: '',
      secret: ''
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);   
    this.addFav = this.addFav.bind(this); 
    this.getSecret = this.getSecret.bind(this);
  }

  // on page load, check to see if there's a user that has already logged in. If so, load their data, otherwise console.log the error which will be a 404.
  componentDidMount() {
    axios.get('/api/getUser').then(res => {
      this.setState({
        user: res.data.name,
        favorites: res.data.favorites
      })
    }).catch(err => console.log(err))
  }

  // login function, send the username and password to login. If successful, the user object will be sent back and set to state.
  // If not, alert the error so that it's obvious that the credentials were incorrect
  login() { 
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/api/login', user).then(res => {
      this.setState({
        username: '',
        password: '',
        user: res.data.name
      })
    }).catch(err => alert(err))
  }

  // logout and set everything back to blank
  logout() {
    axios.post('/api/logout').then(res => {
      this.setState({
        user: '',
        favorites: [],
        secret: ''
      })
    }).catch(err => console.log(err))
  }

  // add a favorite thing from the input to the list of favorite things being stored in the session. The response will be the array of favorites that were stored in the session.
  addFav() {
    axios.post('/api/addFav', {favorite: this.state.favInput}).then(res => {
      this.setState({
        favorites: res.data,
        favInput: ''
      })
    }).catch(err => console.log(err))
  }

  // get the secret. This is an authenticated endpoint so if unsuccessful, it will alert the error saying that the user is not allowed to get the secret
  getSecret() {
    axios.get('/api/secretData').then(res => {
      this.setState({
        secret: res.data.secret
      })
    }).catch(err => alert(err))
  }

  render() {
    // putting together the list of favorites to display in the jsx below
    let favorties = this.state.favorites.map((e, i) => {
      return <p key={e.favorite + i}>{e.favorite}</p>
    })

    // NOTE: this code uses a lot of ternary operators to conditionally render. If someone is logged in, different things will display. I used spaces to show the different blocks of code.
    return (
      <div className="App">

        <h1>{ this.state.user ? this.state.user : 'There is no one logged in!' }</h1>

        { this.state.user ? 
          <div>
            <input 
              type="text"
              value={this.state.favInput}
              onChange={(e) => this.setState({favInput: e.target.value})}/>
            <button onClick={this.addFav}>Add Favorite Thing</button>
            <button onClick={this.logout}>Logout</button>
            <h2>Favorite things:</h2>
            { favorties }
          </div>

          :

          <div>
            <input 
              type="text" 
              value={ this.state.username }
              onChange={(e) => this.setState({username: e.target.value})}/>
            <input 
              type="text" 
              value={ this.state.password }
              onChange={(e) => this.setState({password: e.target.value})}/>
            <button onClick={this.login}>Login</button>
          </div> }

          <h2>The secret is: { this.state.secret ? this.state.secret : "..."}</h2>
          <button onClick={this.getSecret}>Get Secret</button>
      </div>
    );
  }
}

export default App;
