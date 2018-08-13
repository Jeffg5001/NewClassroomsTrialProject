import React, {Component} from 'react';
import {jsonToData, statsToPercents} from '../../utils';

export default class DataEntryForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            method: 'file',
            jsonString:'',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e){
        
        this.setState({...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        if(e.target.method.value === 'file'){
            const fr = new FileReader()
            fr.onload = (event)=>{
                let stats = jsonToData(event.target.result)
                this.props.submitData(statsToPercents(stats))
            }
            let blob = event.target.jsonFile.files[0]
            fr.readAsText(blob)
        }else{
            let stats = jsonToData(this.state.jsonString)
            this.props.submitData(statsToPercents(stats))
        }
    }

    render(){
        return (
            <form id='DataEntryForm' onSubmit={this.handleSubmit}>
                <h3>I would like to enter data as</h3>
                <input type='radio' name='method' value='file' onChange={this.handleChange} defaultChecked /> <label htmlFor='file'>a file </label> <br/>
                <input type='radio' name='method' value='text' onChange={this.handleChange} /> <label htmlFor='text'> text </label>
                {this.state.method === 'file' ? 
                <div class='formInput' id='file'>
                    <label htmlFor='jsonFile'>Select a JSON file</label>
                    <br/>
                    <input required name='jsonFile' type='file' accept='.json' />
                </div>
               :
                <div class='formInput' id='text'>
                    <label htmlFor='jsonString'>Paste JSON data</label>
                    <div>
                        <textarea required name='jsonString' form='DataEntryForm' value={this.state.text} onChange={this.handleChange}/>
                    </div>
                </div>
            }

                <input type='submit' />
            </form>
        )
    }
}