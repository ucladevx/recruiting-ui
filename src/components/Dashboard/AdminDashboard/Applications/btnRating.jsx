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
                <div>
                <h3></h3>
                <h3 style={{display: 'inline', marginRight:'50px' }}>{this.state.rating}</h3>
                <img src= "/images/plus.png" style={{display: 'inline-flex', marginRight:'20px' }} onClick={this.increment}/>
                <img src= "/images/minus.png" style={{display: 'inline-flex'}} onClick={this.decrement}/>
                <h1> </h1>
              </div>
            </div>
        );
    }
}
