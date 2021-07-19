// Helper functions using the countryList json.
import countries from './countryList'

// Converts a country code to it's name if possible.
// If the code is valid, this returns a name. Otherwise, it returns the unmodified code.
const codeToName = (code: string): string => {
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].code === code) return countries[i].name
    }
    return code
}

/* Checks if the user-provided country is in the country list.
Returns the country code. If the country isn't found, returns a blank code. */
const hasCountry = (country: string): string | null => {
    for (let i = 0; i < countries.length; i++) {
        // If the user provided a valid country or country code (case-insensitive), return the matching code
        if (countries[i].code === country.toUpperCase() || countries[i].name.toUpperCase() === country.toUpperCase()) return countries[i].code
    }
    // If the user provided neither a valid code or country name, return null
    return null
}

export {codeToName, hasCountry}