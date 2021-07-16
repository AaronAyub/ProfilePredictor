import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import Profile from './interfaces/Profile'
import sendQuery from "./services/sendQuery"

import Query from './components/Query'
import Summary from './components/Summary'
import "./App.css"

const App = (): JSX.Element => {
    const [profile, setProfile] = useState<Profile | null>(null)

    // Create a profile prediction based on the name and country provided by the user
    const predict = async (name: string, country: string | null) => {
        setProfile(await sendQuery(name,country))
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
        if (profile) return true
        else return false
    }

    return (
        <div className="App">
            <Typography align="center" variant="h2" className="title">
                Profile Predictor
            </Typography>
            <Query predict={predict} hasProfile={hasProfile()} />
            <RenderSummary />
        </div>
    );
}

export default App;
