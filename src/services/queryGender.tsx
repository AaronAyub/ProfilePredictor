import GenderStat from '../interfaces/GenderStat'

/* Queries genderize.io for a prediction on gender, given a name. */
const queryGender = async (name: string, country: string | null): Promise<GenderStat> => {
    let request: string = "https://api.genderize.io"
    request += "?name=" + name // Add the name given by the user to the URL
    if (country) request += "&country_id=" + country // If the user entered a country, add that to the URL

    // Send the GET request, and return the json given back
    let response = await fetch(request)
    if (response.ok) {
        return await response.json()
    }
    return {
        gender: null,
        probability: -1,
        count: -1
    }
}

export default queryGender