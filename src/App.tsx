import React, { useState } from 'react'
import { Typography, CircularProgress, Grid } from '@material-ui/core'
import Profile from './interfaces/Profile'
import sendQuery from "./services/sendQuery"

import Query from './components/Query'
import Summary from './components/Summary'
import CountryGraph from './components/CountryGraph'
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
                <React.Fragment>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={2}>
                        <CircularProgress />
                    </Grid>
                    <Grid item xs={5}></Grid>
                </React.Fragment>
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

    // Render the graph of potential countries if a country isn't specified
    const RenderCountryGraph = () => {
        if (profile && profile.country && typeof(profile.country) !== "string" && profile.country.length > 0) {
            return <CountryGraph countries={profile.country} />
        }
        return <React.Fragment></React.Fragment>
    }

    return (
        <div className="App">
            <Typography align="center" variant="h2" className="title">
                Profile Predictor
            </Typography>
            <Grid justifyContent="center" container spacing={4}>
                <Grid item xs={8} md={6} lg={4}>
                    <Query predict={predict} hasProfile={hasProfile()} />
                </Grid>
                <Grid item xs={12}></Grid>
                <RenderProgress />
                <Grid item md={6}>
                    <RenderSummary />
                </Grid>
                <Grid item>
                    <RenderCountryGraph />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
