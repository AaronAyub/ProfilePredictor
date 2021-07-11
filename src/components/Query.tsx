import { Button, TextField, Container } from '@material-ui/core'
import React, { useState } from 'react'

type sendQuery = (name: string, country: string) => void
interface QueryProps {
    sendQuery: sendQuery
}

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
        props.sendQuery(name,country)
        setName("")
        setCountry("")
    }

    return (
        <Container className="middle">
            <TextField value = {name} onChange={handleChangeName} required name="name" label="First Name"/>
            <TextField value = {country} onChange={handleChangeCountry} name="country" label="Country (Optional)"/>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        </Container>
    )
}

export default Query