import Countries from '../interfaces/Countries'
import { PieChart } from 'react-minimal-pie-chart'

interface CountryGraphProps {
    countries: Countries
}

const CountryGraph = (props: CountryGraphProps): JSX.Element => {
    // Creates an array that describes the data in the pie chart
    const populateChart = () => {
        let remainingPercent: number = 100 // This will end as the percent that a person does not belong to any of the listed countries
        let data = [] // The used in the graph
        let colors=[
            "#1769aa",
            "#f50057",
            "#00a152",
            "#ffa000"
        ]

        // Add each country to the graph
        props.countries.forEach((entry) => {
            remainingPercent-= entry.probability
            data.push({
                title: entry.country_id,
                value: entry.probability,
                color: colors[data.length]
            })
        })

        // Add the "Other" entry to the graph
        data.push({
            title: 'Other',
            value: Math.round(remainingPercent * 100) / 100,
            color: colors[data.length]
        })
        return data
    }
    
    return (
        <PieChart
            data={populateChart()}
            label={({dataEntry}) => dataEntry.value + " %"}
            labelStyle={{
                fontSize: '0.2rem'
            }}
            labelPosition={80}
        />
    )

}

export default CountryGraph