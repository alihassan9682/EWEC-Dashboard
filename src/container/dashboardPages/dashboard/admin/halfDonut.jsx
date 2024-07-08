/** @format */

import { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export class Semicirclegauge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [0], // default value for passed_percentage
      options: {
        chart: {
          type: "radialBar",
          height: 320,
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            },
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#fff",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        colors: ["#FF9800"],
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Passed Percentage"],
      },
    };
  }

  fetchData = (startDate, endDate) => {
    axios
      .get(
        `http://127.0.0.1:8000/sample-stats/?start_date=${startDate}&end_date=${endDate}`
      )
      .then((response) => {
        const apiData = response.data;
        this.setState({
          series: [parseFloat(apiData.passed_percentage).toFixed(2)],
          totalSamples: apiData.total_samples,
          failedSamples: apiData.failed_samples,
          failedPercentage: apiData.failed_percentage.toFixed(2),
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the API data:", error);
      });
  };

  componentDidMount() {
    const { start_date, end_date } = this.props;
    this.fetchData(start_date, end_date);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.start_date !== this.props.start_date ||
      prevProps.end_date !== this.props.end_date
    ) {
      this.fetchData(this.props.start_date, this.props.end_date);
    }
  }

  render() {
    return (
      <div>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          height={320}
        />

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div>
            <strong>Total Samples:</strong> {this.state.totalSamples}
          </div>
          <div className="text-rose-600">
            <strong>Failed Samples:</strong> {this.state.failedSamples}
          </div>
          <div>
            <strong>Failed Percentage:</strong> {this.state.failedPercentage}%
          </div>
        </div>
      </div>
    );
  }
}

export default Semicirclegauge;
