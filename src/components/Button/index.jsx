import React from 'react';

export default class Button extends React.Component {
	render() {
		const text = this.props.text;
		const style = this.props.style;
		const small = this.props.small;
		const loading = this.props.loading;

		return (
			<button className={`${style || ''} ${small ? 'small' : ''} ${loading ? 'loading' : ''}`} onClick={this.props.onClick}>
				{(!loading && text) && text}
				{(!loading && this.props.children) && this.props.children}
				{(loading) &&
					<div className="spinner">
						<div className="bounce1"></div>
						<div className="bounce2"></div>
						<div className="bounce3"></div>
					</div>
				}
			</button>
		);
	}
}