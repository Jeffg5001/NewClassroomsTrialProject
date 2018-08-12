import React, {Component} from 'react';
import Barchart from './BarChart'


const DataVisualization = (props) =>{
    console.log(props)
    return (
        <div id='dashboard'>
        <Barchart data={props.data.agePercentages} size={[500,500]} />
        </div>
    )

}
export default DataVisualization