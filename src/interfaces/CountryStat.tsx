// CountryStat is the possible attributes expected from nationalize.io
export default interface CountryStat {
    country: {country_id: string, probability: number}[]
}
