import Query from './components/Query'
import "./App.css"

const App = (): JSX.Element => {
    /* Queries a Demografix ApS service using name or country to retrieve metrics. */
    const sendQuery = async (name: string, country: string | null, metric: "age" | "gender" | "country") => {
        // Start building the URL to send a GET request to
        let request: string
        switch (metric) {
            case "age":
                request = "https://api.agify.io"
                break;
            case "gender":
                request = "https://api.genderize.io"
                break;
            case "country":
                request = "https://api.nationalize.io"
                break;
        }
        // Add the name given by the user to the URL
        request += "?name=" + name
        // If the user entered a country, add that to the URL
        if (country && metric !== "country") {
            request += "&country_id=" + country
        }
        // Send the GET request, and return the json given back
        let response = await fetch(request)
        let json: Object | null = null
        if (response.ok) {
            json = await response.json()
        }
        return json
    }

    // Queries the APIs for all requested metrics
    const predict = (name: string, country: string) => {
        let ageJson = sendQuery(name, country, "age")
        let genderJson = sendQuery(name, country, "gender")
        let countryJson = null
        // Do not predict the country if the user has already provided the country.
        if (!country) {
            countryJson = sendQuery(name, null, "country")
        }
        
        console.log(ageJson)
        console.log(genderJson)
        console.log(countryJson)
    }

    return (
        <div className="App">
            <Query predict={predict} />
        </div>
    );
}

export default App;
