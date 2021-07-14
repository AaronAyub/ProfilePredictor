import React, { useState } from 'react'
import Profile from './interfaces/Profile'
import sendQuery from "./services/sendQuery"


import Query from './components/Query'
import Summary from './components/Summary'
import "./App.css"

const App = (): JSX.Element => {
    const [profile, setProfile] = useState<Profile | null>(null)

    const predict = async (name: string, country: string) => {
        setProfile(await sendQuery(name,country))
    }

    const RenderSummary = () => {
        if (profile) {
            return <Summary profile={profile} />
        }
        return <React.Fragment></React.Fragment>
    }

    return (
        <div className="App">
            <Query predict={predict} />
            <RenderSummary />
        </div>
    );
}

export default App;
