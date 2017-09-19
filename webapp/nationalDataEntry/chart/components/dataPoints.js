import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'

class DataPoint extends Component {

  update(props) {
    const {xScale, yScale, data} = props

    if (data) {
      const circle = d3.select(ReactDOM.findDOMNode(this.refs.circles))
        .selectAll("circle")
        .data(data)

      //update
      circle
        .transition()
        .duration(500)
        .ease(d3.easeCircleOut)
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.value))
        .attr('r', d => d.type === 'odp' ? 4.5 : 6.5)
        .style('fill', d => d.type === 'fra' ? '#ffffff' : '#0098a6')
        .style('stroke', d => d.type === 'fra' ? '#333333' : '#ffffff')
        .style('stroke-width', '1.5')
        .style('opacity', '1')

      //exit
      circle.exit()
        .transition()
        .duration(500)
        .ease(d3.easeCircleOut)
        .attr('cy', d => yScale(0))
        .style('opacity', '0')
        .remove()

      //enter
      circle.enter().append("circle")
        .attr("r", 0)
        .attr('cx', d => xScale(1990))
        .attr('cy', d => yScale(0))
        .style('fill', '#ffffff')
        .attr('cx', d => xScale(d.year))
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut)
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d.value))
        .attr('r', d => d.type === 'odp' ? 4.5 : 6.5)
        .style('fill', d => d.type === 'fra' ? '#ffffff' : '#0098a6')
        .style('stroke', d => d.type === 'fra' ? '#333333' : '#ffffff')
        .style('stroke-width', '1.5')
        .style('opacity', '1')
    }
  }

  componentDidMount() {
    this.update(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps)
  }

  render() {
    return <g ref="circles"></g>
  }

}

export default DataPoint
