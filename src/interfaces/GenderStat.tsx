// GenderStat is the possible attributes expected from genderize.io
export default interface GenderStat {
    gender: string | null,
    probability: number,
    count: number
}