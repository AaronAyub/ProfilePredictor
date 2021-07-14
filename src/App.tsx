import { useState } from 'react'
import Query from './components/Query'
import "./App.css"
import Profile from './interfaces/Profile'
import sendQuery from "./services/sendQuery"

const App = (): JSX.Element => {
    const [profile, setProfile] = useState<Profile | null>(null)

    const predict = async (name: string, country: string) => {
        let tempProfile: Profile = await sendQuery(name,country)
        setProfile(tempProfile)
        console.log(profile)
    }

    return (
        <div className="App">
            <Query predict={predict} />
        </div>
    );
}

export default App;
