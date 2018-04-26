import React from 'react';
import {Pie} from 'react-chartjs-2';

export default class PieChart extends React.Component {
	render() {
		const keys = Object.keys(this.props.data);
		const data = {
			datasets: [{
				data: keys.map(key => this.props.data[key]),
				backgroundColor: ['#95a5db', '#41485e', '#020522', '#fce388', '#f9cc33', '#ea9e31'],
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