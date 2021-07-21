import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import Profile from '../interfaces/Profile'

interface SummaryProps {
    profile: Profile
}

// A textual summary of a profile
const Summary = (props: SummaryProps): JSX.Element => {
    // Display the predicted age if possible
    const RenderAge = () => {
        if (!props.profile.age) {
            return <ListItemText primary="No information on age was found." />
        }
        return <ListItemText primary={`Predicted Age: ${props.profile.age}`} />
    }

    // Display the predicted gender and accuracy if possible
    const RenderGender = () => {
        if (!props.profile.gender) {
            return <ListItemText primary="No information on gender was found." />
        }
        return <ListItemText primary={`Predicted Gender: ${props.profile.gender}`} secondary={`Probability: ${props.profile.genderProbability} %`} />
    }

    /* Displays the predicted country if the user didn't provide one.
    Alternatively, displays the country the user provided one. */
    const RenderCountry = () => {
        if (!props.profile.country) {
            return <ListItemText primary="There was an error predicting the country."/>
        }
        else if (typeof(props.profile.country) === "string") {
            return <ListItemText primary={`Specified Country: ${props.profile.country}`} />
        }
        if (props.profile.country.length === 0) {
            return <ListItemText primary="No information on country was found."/>
        }
        return (
            <React.Fragment>
                <ListItemText primary={`Predicted Country: ${props.profile.country[0].country_id}`} secondary={`Probability: ${props.profile.country[0].probability} %`}/>
                {/* <div>
                    Most Likely Countries:
                    <ul>
                        {list.map((obj:{country_id: string, probability: number}, index: number) => (
                            <li key={obj.country_id}>
                                {index + 1}. {obj.country_id}: {obj.probability} %
                            </li>
                        ))}
                    </ul>
                </div> */}
            </React.Fragment>
        )
    }

    return (
        <List>
            <ListItem className="summaryItem">
                <ListItemText primary={`Name: ${props.profile.name}`}/>
            </ListItem>
            <ListItem className="summaryItem">
                <RenderAge />
            </ListItem>
            <ListItem className="summaryItem">
                <RenderGender />
            </ListItem>
            <ListItem className="summaryItem">
                <RenderCountry />
            </ListItem>
        </List>
    )
}

export default Summary