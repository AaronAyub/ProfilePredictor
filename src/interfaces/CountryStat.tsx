// type CountryStat = {country_id: string, probability: number}[] | string | null
interface CountryStat {
    country: {country_id: string, probability: number}[]
}


export default CountryStat