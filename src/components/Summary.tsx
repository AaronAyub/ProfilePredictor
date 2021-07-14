import React from 'react'
import { Container } from '@material-ui/core'
import Profile from '../interfaces/Profile'

interface SummaryProps {
    profile: Profile
}

const Summary = (props: SummaryProps): JSX.Element => {

    const RenderAge = () => {
        if (props.profile.age === -1) {
            return <React.Fragment></React.Fragment>
        }
        return (
            <div>
                {props.profile.age}
            </div>
        )
    }

    const RenderGender = () => {
        if (!props.profile.gender) {
            return <React.Fragment></React.Fragment>
        }
        return (
            <React.Fragment>
                <div>
                    {props.profile.gender}
                </div>
                <div>
                    {props.profile.genderProbability}
                </div>
            </React.Fragment>
        )
    }

    const RenderCountry = () => {
        if (!props.profile.country) {
            return <React.Fragment></React.Fragment>
        }
        else if (typeof(props.profile.country) === "string") {
            return (
                <div>
                    {props.profile.country}
                </div>
            )
        }
        let list: {country_id: string, probability: number}[] = props.profile.country
        return (
            <div>
                Possible Countries:
                <ul>
                    {list.map((obj:{country_id: string, probability: number}, index: number) => (
                        <li>
                            {index}. {obj.country_id}: {obj.probability}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <Container>
            <div>
                {props.profile.name}
            </div>
            <RenderAge />
            <RenderGender />
            <RenderCountry />
        </Container>
    )
}

export default Summary