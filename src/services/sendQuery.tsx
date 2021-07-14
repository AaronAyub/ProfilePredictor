import Profile from '../interfaces/Profile'
import AgeStat from '../interfaces/AgeStat'
import GenderStat from '../interfaces/GenderStat'
import CountryStat from '../interfaces/CountryStat'

import queryAge from './queryAge'
import queryGender from './queryGender'
import queryCountry from './queryCountry'

// Queries the APIs for all requested metrics
const predict = async (name: string, country: string): Promise<Profile> => {
    let ageStat: AgeStat = await queryAge(name, country)
    let genderStat: GenderStat = await queryGender(name, country)
    let countryStat: CountryStat = null
    // Do not predict the country if the user has already provided the country.
    if (!country) {
        countryStat = await queryCountry(name, null)
    }
    else {
        countryStat = country
    }

    return {
        name: name,
        age: ageStat.age,
        gender: genderStat.gender,
        genderProbability: genderStat.probability,
        country: countryStat
    }
}

export default predict