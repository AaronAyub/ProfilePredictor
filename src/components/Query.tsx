import { Button, TextField, Box } from '@material-ui/core'
import React, { useState } from 'react'

type predict = (name: string, country: string) => void
interface QueryProps {
    predict: predict
}

// The Query component allows the user to query the APIs to create a prediction.
const Query = (props: QueryProps): JSX.Element => {
    const [name, setName] = useState<string>("")
    const [country, setCountry] = useState<string>("")

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value)
    }
    const handleSubmit = () => {
        props.predict(name,country)
        setName("")
        setCountry("")
    }

    return (
        <Box className="query">
            <TextField value = {name} onChange={handleChangeName} required name="name" label="First Name"/>
            <TextField value = {country} onChange={handleChangeCountry} name="country" label="Country (Optional)"/>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </Box>
    )
}

export default Query