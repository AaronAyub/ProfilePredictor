import { Button, TextField, Box, Link } from '@material-ui/core'
import React, { useState } from 'react'
import countries from '../json/countryList.json'

type predict = (name: string, country: string | null) => void
interface QueryProps {
    predict: predict
    hasProfile: boolean
}

// The Query component allows the user to query the APIs to create a prediction.
const Query = (props: QueryProps): JSX.Element => {
    const [name, setName] = useState<string>("")
    const [country, setCountry] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [countryError, setCountryError] = useState<boolean>(false)
    const [nameText, setNameText] = useState<string>("")
    const [countryText, setCountryText] = useState<string>("")

    /* Checks if the user-provided country is in the country list.
    Returns the country code. If the country isn't found, returns a blank code. */
    const hasCountry = (country: string, countries: {[key: string]: string}): string | null => {
        for (let code in countries) {
            // If the user provided a valid country or country code (case-insensitive), return the matching code
            if (code === country.toUpperCase() || countries[code].toUpperCase() === country.toUpperCase()) return code
        }
        // If the user provided neither a valid code or country name, return null
        return null
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value)
    }
    const handleSubmit = () => {
        // Check that the user has entered a name
        if (!name) {
            setNameError(true)
            setNameText("Please enter a first name.")
        }
        else {
            setNameError(false)
            setNameText("")
        }

        // Check that the user entered a valid country or country code
        let countryCode: string | null = null
        if (country) {
            countryCode = hasCountry(country,countries)
            if (!countryCode) {
                setCountryError(true)
                setCountryText("Sorry, do not have data on this country.")
            }
            else {
                setCountryError(false)
                setCountryText("")
            }
        }

        // If there are no errors, send the prediction query.
        if (name && countryCode !== "") {
            props.predict(name,countryCode)
            setName("")
            setCountry("")
        }
    }

    // Shows different instructions depending on whether the user has entered a profile or not
    const RenderInstructions = () => {
        if (props.hasProfile) {
            return (
                <div>
                    Would you like to make another prediction? <Link href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements">Country Codes</Link>
                </div>
            )
        }
        return (
            <div>
                Enter a name and press "Submit" to guess a person's profile.
                <br/>You can also specify the country or two-letter ISO 3166-1 alpha-2 country code for more accurate results.
                <br/>See <Link href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements">this list</Link> for supported countries and their country codes.
            </div>
        )
    }

    return (
        <Box className="query">
            <RenderInstructions />
            <TextField error={nameError} helperText={nameText} value={name} onChange={handleChangeName} name="name" label="First Name"/>
            <TextField error={countryError} helperText={countryText} value={country} onChange={handleChangeCountry} name="country" label="Country (Optional)"/>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </Box>
    )
}

export default Query