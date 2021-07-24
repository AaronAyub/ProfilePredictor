import React from 'react'
import { makeStyles, Grid, Paper } from '@material-ui/core'
import Profile from '../interfaces/Profile'

interface SummaryProps {
    profile: Profile
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default
    },
    probability: {
        color: theme.palette.text.secondary,
        fontSize: 14
    }
}))

// A textual summary of a profile
const Summary = (props: SummaryProps): JSX.Element => {
    const classes = useStyles()

    // Display the predicted age if possible
    const RenderAge = () => {
        if (!props.profile.age) {
            return <React.Fragment>No information on age was found.</React.Fragment>
        }
        return <React.Fragment>Predicted Age: {props.profile.age}</React.Fragment>
    }

    // Display the predicted gender and accuracy if possible
    const RenderGender = () => {
        if (!props.profile.gender) {
            return <React.Fragment>No information on gender was found.</React.Fragment>
        }
        return (
            <React.Fragment>
                Predicted Gender: {props.profile.gender}
                <div className={classes.probability}>
                    Probability: {props.profile.genderProbability} %
                </div>
            </React.Fragment>
        )
    }

    /* Displays the predicted country if the user didn't provide one.
    Alternatively, displays the country the user provided one. */
    const RenderCountry = () => {
        if (!props.profile.country) {
            return <React.Fragment>There was an error predicting the country.</React.Fragment>
        }
        else if (typeof(props.profile.country) === "string") {
            return <React.Fragment>Specified Country: {props.profile.country}</React.Fragment>
        }
        if (props.profile.country.length === 0) {
            return <React.Fragment>No information on country was found.</React.Fragment>
        }
        return (
            <React.Fragment>
                Predicted Country: {props.profile.country[0].country_id}
                <div className={classes.probability}>
                    Probability: {props.profile.country[0].probability} %
                </div>
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
        <Grid container spacing={3}>
            <Grid item xs={6} md={12}>
                <Paper className={classes.paper}>
                    Name: {props.profile.name}
                </Paper>
            </Grid>
            <Grid item xs={6} md={12}>
                <Paper className={classes.paper}>
                    <RenderAge />
                </Paper>
            </Grid>
            <Grid item xs={6} md={12}>
                <Paper className={classes.paper}>
                    <RenderGender />
                </Paper>
            </Grid>
            <Grid item xs={6} md={12}>
                <Paper className={classes.paper}>
                    <RenderCountry />
                </Paper>
            </Grid>
        </Grid>
        // <List>
        //     <ListItem className="summaryItem">
        //         <ListItemText primary={`Name: ${props.profile.name}`}/>
        //     </ListItem>
        //     <ListItem className="summaryItem">
        //         <RenderAge />
        //     </ListItem>
        //     <ListItem className="summaryItem">
        //         <RenderGender />
        //     </ListItem>
        //     <ListItem className="summaryItem">
        //         <RenderCountry />
        //     </ListItem>
        // </List>
    )
}

export default Summary