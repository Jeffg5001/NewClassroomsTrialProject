import React, { Component } from 'react';
import { scaleLinear, scaleBand} from 'd3-scale';
import {max} from 'd3-array'
import {select} from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis';
class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
        this.removeYAxis = this.removeYAxis.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.removeYAxis()
        this.createBarChart()
    }
    createBarChart() {
        const margin = {
            top: 20,
            right: 20,
            bottom: 35,
            left: 60
        }
        const width = this.props.size[0] - margin.left - margin.right
        const height = this.props.size[1] - margin.top - margin.bottom;
        const x = scaleBand().rangeRound([0, width]).padding(0.1)
        const y = scaleLinear().rangeRound([height, 0])

        const node = this.node
        const g = select(node).append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        const dataMax = max(this.props.data.map(obj => obj.percentage / 100))
        y.domain([0, dataMax])
        x.domain(this.props.data.map(obj => obj.range))

        g
            .append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(axisBottom(x))
        g
            .append('g')
            .call(axisLeft(y).ticks(10, '%'))
        g
            .selectAll('rect')
            .data(this.props.data.map(obj => obj.percentage / 100))
            .enter()
            .append('rect')
        g
            .selectAll('rect')
            .data(this.props.data.map(obj => obj.percentage / 100))
            .exit()
            .remove()

        g
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', d => x(d.range))
            .attr('y', d => y(d.percentage / 100))
            .attr('height', d => height - y(d.percentage / 100))
            .attr('width', x.bandwidth())
    }

    removeYAxis(){
        select(this.node).selectAll('g').remove()
    }

    render() {
        return <svg ref = {node => this.node = node} width = { 500 } height = {500} >
            </svg>
    }
}
export default BarChart