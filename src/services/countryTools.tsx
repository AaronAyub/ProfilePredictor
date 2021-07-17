// Helper functions using the countryList json.
import countriesJson from '../json/countryList.json'
let countries: {[key: string]: string} = countriesJson

// Converts a country code to it's name if possible.
// If the code is valid, this returns a name. Otherwise, it returns the unmodified code.
const codeToName = (code: string): string => {
    if (code in countries) {
        return countries[code]
    }
    else return code
}

/* Checks if the user-provided country is in the country list.
Returns the country code. If the country isn't found, returns a blank code. */
const hasCountry = (country: string): string | null => {
    for (let code in countries) {
        // If the user provided a valid country or country code (case-insensitive), return the matching code
        if (code === country.toUpperCase() || countries[code].toUpperCase() === country.toUpperCase()) return code
    }
    // If the user provided neither a valid code or country name, return null
    return null
}

export {codeToName, hasCountry}