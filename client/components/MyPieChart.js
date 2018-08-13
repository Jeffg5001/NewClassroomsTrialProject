import React, {Component} from 'react';
import PieChart from 'react-svg-piechart';

export default class MyPieChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            currValue:null,
            currTitle:null
        }
        this.handleHover = this.handleHover.bind(this)
    }

    handleHover(d, i, e){
        if(d){
            this.setState({currValue:d.value, currTitle:d.title})
        }else{
            this.setState({currValue:null, currTitle:null})
        }
    }

    render(){
        return (
            <div>
                <fieldset className='legend'>
                <legend>
                Legend
                </legend>
                {this.props.data.map(dataObj =>(
                    <p>{dataObj.title}: <div style={{height:'10px', width:'10px', background:dataObj.color, display:'inline-block'}} /></p> 
                ))}
                {this.state.currValue ? <p>{this.state.currValue}% {this.state.currTitle}</p>:<p>Hover over section to see value</p>}
                </fieldset>
                <PieChart data={this.props.data} 
                expandOnHover
                
                onSectorHover={this.handleHover}

                />
            </div>
        )
    }
}