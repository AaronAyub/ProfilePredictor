import Countries from './Countries'

// A profile is a set of predictions (age, gender, and nationality) based on a given name.
export default interface Profile {
    name: string,
    age: number | null,
    gender: string | null,
    genderProbability: number,
    country: string | null | Countries
}