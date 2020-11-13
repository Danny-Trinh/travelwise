<<<<<<< HEAD:src/pages/Chart1.tsx
import React, { Component } from "react";
import * as d3 from "d3";
class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = [12, 5, 6, 6, 9, 10];
    const h = 500;
    const w = 400;

    const svg = d3
      .select("body")
=======
import React, { Component } from 'react'
import * as d3 from 'd3'
import Axios from "axios";
class CovidChart extends Component {
    state = {
      data:[]
    }
    componentDidMount() {
      this.getData();
    }
    async getData() {
      let json = await Axios.get(`https://api.travelwise.live/covid`);
      this.setState({
        data: json.data,
      });
    }
      
    drawChart() {
      let data: Array<any> = [];
      this.state.data.forEach((i: any) => {
        data.push(i.total_cases);
      });
      console.log(data);
      const h = 500; const w= 400;
      
      const svg = d3.select("div")
>>>>>>> d81d642d595cc94ed18125160a4be75110c35e35:src/components/CovidChart.tsx
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);
<<<<<<< HEAD:src/pages/Chart1.tsx

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");
  }

  render() {
    return <div></div>;
  }
}

export default BarChart;
=======
                    
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70)
        .attr("y", (d, i) => h - 10 * d)
        .attr("width", 65)
        .attr("height", (d, i) => d * 10)
        .attr("fill", "green")
    }
          
    render(){
      this.drawChart();
      return <div></div>
    }
  }
      
  export default CovidChart;
>>>>>>> d81d642d595cc94ed18125160a4be75110c35e35:src/components/CovidChart.tsx
