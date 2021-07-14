export default interface Profile {
    name: string,
    age: number,
    gender: string,
    genderProbability: number,
    country: string | null | {country_id: string, probability: number}[],
}