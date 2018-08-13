import React, {Component} from 'react';
import Barchart from './BarChart';
import MyPieChart from './MyPieChart';


const DataVisualization = (props) =>{
    console.log(props)
    const colors = ['#9BD770', '#67AFCB', '#678FFE', '#8C78E8', '#C91BFE', '#ED5094', '#FE8176', '#FE9F6D', '#FDC168', '#FDE281'] 
    return (
        <div id='dashboard'>
        <div id='ageDistributionContainer' className='chart-container bar'>
            <h4 id='age-title'>Age Distribution</h4>
            <p id='age-y-axis'>Percent of People</p>
            <p id='age-x-axis'>Age Ranges (years old)</p>
            <Barchart data={props.data.agePercentages} size={[500,500]} />
        </div>
        <div id='femaleVsMalePieChartContainer' className='chart-container pie'>
            <h4 id='genders-title'>Gender Distribution</h4>
            <MyPieChart data={[
                {title:"Male", value:props.data.percentMale, color:'#609CE1'},
                {title:"Female", value:props.data.percentFemale, color:'#236AB9'}
            ]} 
            />
        </div>
        <div id='firstNameAlphabeticalContainer' className='chart-container pie'>
            <h4 id='first-names-title'>First Names That Start With A-M vs N-Z</h4>
            <MyPieChart data={[
                {title:"A-M", value:props.data.percentFirstNameAM, color:'#FDC168'},
                {title:"N-Z", value:props.data.percentFirstNameNZ, color:'#FB9902'},
            ]}
            />
        </div>
        <div id='lastNameAlphabeticalContainer' className='chart-container pie'>
            <h4 id='last-names-title'>Last Names That Start With A-M vs N-Z</h4>
            <MyPieChart data={[
                {title:"A-M", value:props.data.percentLastNameAM, color:'green'},
                {title:"N-Z", value:props.data.percentLastNameNZ, color:'greenyellow'},
            ]}
            />
        </div>
        <div id='peopleInEachStateContainer' className='chart-container pie'>
            <h4 id='state-people-title'>Percentage of People in Each State (10 Most Populous)</h4>
            <MyPieChart data={props.data.statePopulationPercentArr.map(
                (stateObj, i) =>(
                {title:stateObj.name, value:stateObj.population, color:colors[i]})
            )}
            />
        </div>
        <div id='malesInEachStateContainer' className='chart-container pie'>
            <h4 id='state-males-title'>Percentage of Males in Each State (10 Most Populous)</h4>
            <MyPieChart data={props.data.stateMalePopulationPercentArr.map(
                (stateObj, i) =>(
                {title:stateObj.name, value:stateObj.population, color:colors[i]})
            )}
            />
        </div>
        <div id='malesInEachStateContainer' className='chart-container pie'>
            <h4 id='state-males-title'>Percentage of Females in Each State (10 Most Populous)</h4>
            <MyPieChart data={props.data.stateFemalePopulationPercentArr.map(
                (stateObj, i) =>(
                {title:stateObj.name, value:stateObj.population, color:colors[i]})
            )}
        />
    </div>
        </div>
    )

}
export default DataVisualization