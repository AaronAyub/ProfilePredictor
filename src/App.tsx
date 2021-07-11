import Query from './components/Query'
import "./App.css"
import React from 'react';

class App extends React.Component  {

  // async predictAge(name: string) {
  //   let request: string = "https://api.agify.io?name=" + name
  //   let response = await fetch(request)
  //   let json
  //   if (response.ok) {
  //     json = await response.json()
  //   }
  //   console.log(json)
  // }

  sendQuery(name: string, country: string) {
    console.log(name + " " + country)
  }

  // componentDidMount() {
  //   this.predictAge("test")
  // }

  render() {
    return (
      <div className="App">
        <Query sendQuery={this.sendQuery} />
      </div>
    );
  }

}

export default App;
