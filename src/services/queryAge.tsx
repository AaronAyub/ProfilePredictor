import AgeStat from '../interfaces/AgeStat'

/* Queries agify.io for a prediction on age, given a name. */
const queryAge = async (name: string, country: string | null): Promise<AgeStat> => {
    let request: string = "https://api.agify.io"
    request += "?name=" + name // Add the name given by the user to the URL
    if (country) request += "&country_id=" + country // If the user entered a country, add that to the URL

    // Send the GET request, and return the json given back
    let response = await fetch(request)
    if (response.ok) {
        return await response.json()
    }
    return {
        age: null,
        count: -1
    }
}

export default queryAge