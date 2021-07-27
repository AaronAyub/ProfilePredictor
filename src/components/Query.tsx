import { makeStyles, Button, TextField, Box } from '@material-ui/core'
import React, { useState } from 'react'
import { hasCountry } from '../services/countryTools'
import countries from '../services/countryList'
import { Autocomplete } from '@material-ui/lab'

type predict = (name: string, country: string | null) => void
interface QueryProps {
    predict: predict
    hasProfile: boolean
}

const useStyles = makeStyles ((theme) => ({
    submitButton: {
        marginTop: '1rem'
    }
}))

// The Query component allows the user to query the APIs to create a prediction.
const Query = (props: QueryProps): JSX.Element => {
    const classes = useStyles()

    const [name, setName] = useState<string>("")
    const [country, setCountry] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [countryError, setCountryError] = useState<boolean>(false)
    const [nameText, setNameText] = useState<string>("")
    const [countryText, setCountryText] = useState<string>("")

    // Sort the countries by name for the query module, as it is more user-friendly than sorting by country-code.
    countries.sort((a,b) => a.name.localeCompare(b.name))

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
            countryCode = hasCountry(country)
            if (!countryCode) {
                setCountryError(true)
                setCountryText("Sorry, do not have data on this country.")
                return
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
                    Would you like to make another prediction?
                </div>
            )
        }
        return (
            <div>
                Enter a name and press "Submit" to guess a person's profile.
                <br/>You can also specify the country or two-letter country code for more accurate results.
            </div>
        )
    }

    return (
        <Box className="query">
            <RenderInstructions />
            <TextField fullWidth error={nameError} helperText={nameText} value={name} onChange={handleChangeName} name="name" label="First Name"/>
            
            <Autocomplete
            options={countries as {code: string, name: string}[]}
            inputValue={country}
            onInputChange={(event:React.ChangeEvent<{}>, newInputValue:string) => {
                setCountry(newInputValue)
            }}
            freeSolo // Prevent the autocompletion from overwriting invalid user responses.
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
                <React.Fragment>
                    {option.name} ({option.code})
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name="country"
                    onChange={handleChangeCountry}
                    error={countryError}
                    helperText={countryText}
                    value={country}
                    label="Country (Optional)"
                />
            )}
            />
            
            <Button className={classes.submitButton} onClick={handleSubmit} variant="contained" color="primary">Predict</Button>
        </Box>
    )
}

export default Query