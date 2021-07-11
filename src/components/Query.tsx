import { Button, TextField, Container } from '@material-ui/core'
import React, { FormEvent } from 'react'

interface QueryProps {
    sendQuery: Function
}

class Query extends React.Component<QueryProps> {
    state = {
        name: "",
        country: ""
    }

    handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value})
    }
    handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({country: event.target.value})
    }
    handleSubmit = () => {
        this.props.sendQuery(this.state.name,this.state.country)
    }

    render() {
        return (
            <Container className="middle">
                <TextField value = {this.state.name} onChange={this.handleChangeName} required name="name" label="First Name"/>
                <TextField value = {this.state.country} onChange={this.handleChangeCountry} name="country" label="Country (Optional)"/>
                <Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
            </Container>
        )
    }
}

export default Query