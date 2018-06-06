import React from 'react';

export default class ButtonRating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.originalValue || 0,
        }
    }
    increment = () => {
        // this.setState({rating: 
        this.props.onChange(this.props.name, this.state.rating == 5 ? 0 : this.state.rating + 1);
    }
    decrement = () => {
        // this.setState({rating: this.state.rating == 0 ? 5 : this.state.rating - 1});
        this.props.onChange(this.props.name, this.state.rating == 0 ? 5 : this.state.rating - 1);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({rating: nextProps.originalValue});
    }
    render() {
        return(
            <div>
				<label className="input-title" htmlFor={this.props.name}>{this.props.title}</label><br />
                <h3>{this.state.rating}</h3>
                <h3 onClick={this.increment}>+</h3>
                <h3 onClick={this.decrement}>-</h3>
            </div>
        );
    }
}