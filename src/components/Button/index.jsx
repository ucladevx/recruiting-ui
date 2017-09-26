import React from 'react';
import Loader from 'components/Loader';

export default class Button extends React.Component {
	render() {
		const text = this.props.text;
		const style = this.props.style;
		const small = this.props.small;
		const loading = this.props.loading;

		return (
			<button className={`${style || ''} ${small ? 'small' : ''} ${loading ? 'loading' : ''}`} onClick={this.props.onClick} id={this.props.id}>
				{(!loading && text) && text}
				{(!loading && this.props.children) && this.props.children}
				{(loading) && <Loader /> }
			</button>
		);
	}
}