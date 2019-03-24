import React, { Component } from 'react';
import Label from '../Label';
class Slider extends Component {

    render() {
        return (
            <div className="form-control">
                <Label value={this.props.label} />
                <input
                    type={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    className="form-control__field"
                />
                <input
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    min={this.props.range.min}
                    max={this.props.range.max}
                    step={this.props.range.step}
                    className="form-control__slider"
                />
            </div>
        );
    }
}

export default Slider;
