import Query from './components/Query'
import "./App.css"

const App = (): JSX.Element => {
    interface Profile {
        name: string,
        age: string,
        gender: string,
        genderProbability: number,
        country: string | {country_id: string, probabiltiy: number}[],
        predictedCountry: boolean
    }

    interface AgeJson {
        age: number,
        count: number
    }

    interface GenderJson {
        gender: string,
        probability: number,
        count: number
    }

    type CountryJson = {country_id: string, probability: number}[] | null

    // /* Queries a Demografix ApS service using name or country to retrieve metrics. */
    // const sendQuery = async (name: string, country: string | null, metric: "age" | "gender" | "country"): Promise<AgeJson | GenderJson | CountryJson | null> => {
    //     // Start building the URL to send a GET request to
    //     let request: string
    //     switch (metric) {
    //         case "age":
    //             request = "https://api.agify.io"
    //             break;
    //         case "gender":
    //             request = "https://api.genderize.io"
    //             break;
    //         case "country":
    //             request = "https://api.nationalize.io"
    //             break;
    //     }
    //     // Add the name given by the user to the URL
    //     request += "?name=" + name
    //     // If the user entered a country, add that to the URL
    //     if (country && metric !== "country") {
    //         request += "&country_id=" + country
    //     }
    //     // Send the GET request, and return the json given back
    //     let response = await fetch(request)
    //     let json: Object | null = null
    //     if (response.ok) {
    //         json = await response.json()
    //     }
    //     return null
    // }

    const queryAge = async (name: string, country: string | null): Promise<AgeJson> => {
        let request: string = "https://api.agify.io"
        request += "?name=" + name // Add the name given by the user to the URL
        if (country) request += "&country_id=" + country // If the user entered a country, add that to the URL

        // Send the GET request, and return the json given back
        let response = await fetch(request)
        if (response.ok) {
            return await response.json()
        }
        return {
            age: -1,
            count: -1
        }
    }

    const queryGender = async (name: string, country: string | null): Promise<GenderJson> => {
        let request: string = "https://api.genderize.io"
        request += "?name=" + name // Add the name given by the user to the URL
        if (country) request += "&country_id=" + country // If the user entered a country, add that to the URL

        // Send the GET request, and return the json given back
        let response = await fetch(request)
        if (response.ok) {
            return await response.json()
        }
        return {
            gender: "undefined",
            probability: -1,
            count: -1
        }
    }
    
    const queryCountry = async (name: string, country: string | null): Promise<CountryJson> => {
        let request: string = "https://api.nationalize.io"
        request += "?name=" + name // Add the name given by the user to the URL
        if (country) request += "&country_id=" + country // If the user entered a country, add that to the URL

        // Send the GET request, and return the json given back
        let response = await fetch(request)
        if (response.ok) {
            return await response.json()
        }
        return null
    }

    // Queries the APIs for all requested metrics
    const predict = async (name: string, country: string) => {
        let ageJson = await queryAge(name, country)
        let genderJson = await queryGender(name, country)
        let countryJson = null
        // Do not predict the country if the user has already provided the country.
        if (!country) {
            countryJson = await queryCountry(name, null)
        }
        
        let age: AgeJson = {
            age: ageJson.age,
            count: ageJson.count
        }

        let gender: GenderJson = {
            gender: genderJson.gender,
            probability: genderJson.probability,
            count: genderJson.count
        }

        let countries: CountryJson = null
        if (!country) {
            countries = countryJson
        }

        console.log(age)
        console.log(gender)
        console.log(countries)

        // let profile: Profile = {
        //     name: name,
        //     age: ageJson.age,
            
        // }
        // console.log(profile)
    }

    return (
        <div className="App">
            <Query predict={predict} />
        </div>
    );
}

export default App;
