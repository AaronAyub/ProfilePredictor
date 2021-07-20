import React, { useState } from 'react'
import { Typography, CircularProgress, Grid } from '@material-ui/core'
import Profile from './interfaces/Profile'
import sendQuery from "./services/sendQuery"

import Query from './components/Query'
import Summary from './components/Summary'
import "./App.css"

const App = (): JSX.Element => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [progress, setProgress] = useState<boolean>(false) // Set to true a query is in progress
    const [first, setFirst] = useState<boolean>(false) // Set to true if the user has made their first prediction

    // Create a profile prediction based on the name and country provided by the user
    const predict = async (name: string, country: string | null) => {
        setProfile(null)
        setProgress(true)
        setProfile(await sendQuery(name,country))
        setProgress(false)
        setFirst(true)
    }

    // Indicate to the user that a query is in progress.
    const RenderProgress = () => {
        if (progress) {
            return (
                <Grid container justify="center">
                    <CircularProgress />
                </Grid>
            )
        }
        return <React.Fragment></React.Fragment>
    }

    // Render the summary object only if a profile exists.
    const RenderSummary = () => {
        if (profile) {
            return <Summary profile={profile} />
        }
        return <React.Fragment></React.Fragment>
    }

    // Returns true if a profile has already been created.
    const hasProfile = () => {
        if (first) return true
        else return false
    }

    return (
        <div className="App">
            <Typography align="center" variant="h2" className="title">
                Profile Predictor
            </Typography>
            <Query predict={predict} hasProfile={hasProfile()} />
            <RenderProgress />
            <RenderSummary />
        </div>
    );
}

export default App;
