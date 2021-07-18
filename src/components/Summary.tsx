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
        if (!props.profile.age) {
            return <div>No information on age was found.</div>
        }
        return (
            <div>
                Predicted Age: {props.profile.age}
            </div>
        )
    }

    // Display the predicted gender and accuracy if possible
    const RenderGender = () => {
        if (!props.profile.gender) {
            return <div>No information on gender was found.</div>
        }
        return (
            <div>
                Predicted Gender: {props.profile.gender} ({props.profile.genderProbability} % likely)
            </div>
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
                    Specified Country: {props.profile.country}
                </div>
            )
        }
        let list: {country_id: string, probability: number}[] = props.profile.country
        if (list.length === 0) {
            return (
                <div>No information on country was found.</div>
            )
        }
        return (
            <React.Fragment>
                <div>Predicted Country: {list[0].country_id} ({list[0].probability} % likely)</div>
                <div>
                    Most Likely Countries:
                    <ul>
                        {list.map((obj:{country_id: string, probability: number}, index: number) => (
                            <li key={obj.country_id}>
                                {index + 1}. {obj.country_id}: {obj.probability} %
                            </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
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