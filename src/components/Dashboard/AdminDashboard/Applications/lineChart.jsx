import React from 'react';
import {Line} from 'react-chartjs-2';

export default class LineChart extends React.Component {
	render() {
		const keys = Object.keys(this.props.data).sort();

		const data = {
			labels: keys,
			datasets: [{
				label: this.props.title,
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 2,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(75,192,192,1)',
				pointHoverBorderWidth: 3,
				pointRadius: 3,
				pointHitRadius: 10,
				data: keys.map(key => this.props.data[key]),
			}]
		};

		const options = {
			title: {
				display: true,
				text: this.props.title,
				fontFamily: '"Roboto"',
			},
			legend: {
				display: false,
				position: 'bottom',
			},
			responsive: true,
		};

		return (
			<div className="app-stats-long">
				<Line data={data} options={options} height={300} width={900} />
			</div>
		)
	}
}