import Countries from '../interfaces/Countries'
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

interface CountryGraphProps {
    countries: Countries
}

const CountryGraph = (props: CountryGraphProps): JSX.Element => {
    const [data, setData] = useState<{name: string; value: number;}[]>([])

    const colors = [
        "#1769aa",
        "#f50057",
        "#00a152",
        "#ffa000"
    ]
    
    useEffect(() => {
        let remainingPercent: number = 100 // This will end as the percent that a person does not belong to any of the listed countries
        let data = [] // The used in the graph
        
        // Add each country to the graph
        props.countries.forEach((entry) => {
            remainingPercent-= entry.probability
            data.push({
                name: entry.country_id,
                value: entry.probability
            })
        })

        // Add the "Other" entry to the graph
        data.push({
            name: 'Other',
            value: Math.round(remainingPercent * 100) / 100
        })
        setData(data)
    },[props.countries])
    
    return (
        <React.Fragment>
            <Typography align="center" variant="h5">
                Countries by Probability
            </Typography>
            <PieChart
            height={500}
            width={500}
            cy={80}
            >
                <Pie data={data}
                dataKey="value"
                nameKey="name"
                label={true}>
                    {data.map((entry, index) => (
                        <Cell key={index} fill={colors[index % colors.length]}/>
                    ))}
                </Pie>
                <Legend />
                <Tooltip />
            </PieChart>
        </React.Fragment>
    )

}

export default CountryGraph