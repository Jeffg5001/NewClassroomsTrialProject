import React, {Component} from 'react';
import DataEntryForm from './components/DataEntryForm.js';
import DataVisualization from './components/DataVisualization';


export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:{}
        }
        this.submitData = this.submitData.bind(this)
    }
    submitData(data){
        this.setState({
            data:{...data}
        })
    }
    
    render(){
        return (
            <div>
            <h1>Enter Data Below</h1>
            <DataEntryForm submitData={this.submitData}/>
            {this.state.data.agePercentages &&
            <DataVisualization data={this.state.data}/>
            }

            </div>
        )
    }
}