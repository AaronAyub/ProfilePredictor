import React from 'react'
import { Box } from '@material-ui/core'
import Profile from '../interfaces/Profile'

interface SummaryProps {
    profile: Profile
}

// A textual summary of a profile
const Summary = (props: SummaryProps): JSX.Element => {
    // Display the predicted age if possible
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

    // Display the predicted gender and accuracy if possible
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
                    {props.profile.genderProbability} %
                </div>
            </React.Fragment>
        )
    }

    /* Displays the predicted country if the user didn't provide one.
    Alternatively, displays the country the user provided one. */
    const RenderCountry = () => {
        if (!props.profile.country) {
            return (
                <div>There was an error predicting the country.</div>
            )
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
                Most Likely Countries:
                <ul>
                    {list.map((obj:{country_id: string, probability: number}, index: number) => (
                        <li>
                            {index}. {obj.country_id}: {obj.probability} %
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <Box>
            <div>
                {props.profile.name}
            </div>
            <RenderAge />
            <RenderGender />
            <RenderCountry />
        </Box>
    )
}

export default Summary