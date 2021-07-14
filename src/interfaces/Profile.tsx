export default interface Profile {
    name: string,
    age: number,
    gender: string | null,
    genderProbability: number,
    country: string | null | {country_id: string, probability: number}[]
}