import React from 'react';
import {Pie} from 'react-chartjs-2';

export default class PieChart extends React.Component {
	render() {
		const keys = Object.keys(this.props.data);
		const data = {
			datasets: [{
				data: keys.map(key => this.props.data[key]),
				backgroundColor: ['#80D8FF', '#B9F6CA', '#FF9E80', '#FFE57F'],
			}],
			labels: keys
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
			<div className="app-stats">
				<Pie data={data} options={options} height={300} />
			</div>
		)
	}
}