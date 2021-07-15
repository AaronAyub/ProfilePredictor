import CountryStat from '../interfaces/CountryStat'


/* Queries nationalize for a list of countries which a name might belong to. */
const queryCountry = async (name: string): Promise<CountryStat> => {
    let request: string = "https://api.nationalize.io"
    request += "?name=" + name // Add the name given by the user to the URL

    // Send the GET request, and return the json given back
    let response = await fetch(request)
    if (response.ok) {
        return await response.json()
    }
    return {country: []}
}

export default queryCountry