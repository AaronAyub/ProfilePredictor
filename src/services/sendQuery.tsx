import Profile from '../interfaces/Profile'
import AgeStat from '../interfaces/AgeStat'
import GenderStat from '../interfaces/GenderStat'
import CountryStat from '../interfaces/CountryStat'

import queryAge from './queryAge'
import queryGender from './queryGender'
import queryCountry from './queryCountry'
import { codeToName } from './countryTools'

// Queries the APIs for all requested metrics to return a profile prediction
const predict = async (name: string, country: string | null): Promise<Profile> => {
    let ageStat: AgeStat = await queryAge(name, country)
    let genderStat: GenderStat = await queryGender(name, country)
    let countryStat: string | null | {country_id: string, probability: number}[] = null
    
    // Do not predict the country if the user has already provided the country.
    if (!country) {
        let countryJson: CountryStat = await queryCountry(name)
        countryStat = countryJson.country
    }
    else { // If the user has provided a country, just use that for the profile's country
        countryStat = country
    }

    if (countryStat) {
        if (typeof(countryStat) === "string") {
            countryStat = codeToName(countryStat)
        }
        else {
            countryStat = countryStat.map((entry) => {
                entry = {
                    country_id: codeToName(entry.country_id),
                    probability: Math.round(entry.probability * 10000) / 100
                }
                return entry
            })
        }
    }

    return {
        name: name,
        age: ageStat.age,
        gender: genderStat.gender,
        genderProbability: genderStat.probability * 100,
        country: countryStat
    }
}

export default predict