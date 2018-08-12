import React, { Component } from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis';
class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
       const height = this.props.size[1]
        const x = scaleBand().rangeRound([0,this.props.size[0]]).padding(0.1)
        const y = scaleLinear().rangeRound([height,0])

      const node = this.node
      const g = select(node).append('g')
      const dataMax = max(this.props.data.map( obj => obj.percentage / 100))
      y.domain([0, dataMax])
      x.domain(this.props.data.map( obj => obj.range))

    g
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(axisBottom(x))
    g
        .append('g')
        .attr("transform", "translate(35,0)")
        .call(axisLeft(y).ticks(10,'%'))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Percent of People");

    g
        .selectAll('rect')
        .data(this.props.data.map( obj => obj.percentage / 100))
        .enter()
        .append('rect')

    g
        .selectAll('rect')
        .data(this.props.data.map( obj => obj.percentage / 100))
        .exit()
        .remove()

    g
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d) => x(d.range))
      .attr('y', d => y(d.percentage / 100))
      .attr('height', d => height - y(d.percentage / 100))
      .attr('width', x.bandwidth())
   }
    render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default BarChart