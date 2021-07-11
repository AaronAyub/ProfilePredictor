import Query from './components/Query'
import "./App.css"

const App = (): JSX.Element => {

  const predictAge = async (name: string, country: string) => {
    let request: string = "https://api.agify.io?name=" + name
    let response = await fetch(request)
    let json
    if (response.ok) {
      json = await response.json()
    }
    console.log(json)
  }

  const sendQuery = (name: string, country: string) => {
    predictAge(name,country)
  }

  return (
    <div className="App">
      <Query sendQuery={sendQuery} />
    </div>
  );
}

export default App;
