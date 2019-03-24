import React, { Component } from 'react';
import Label from '../Label';
class Input extends Component {

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
            </div>
        );
    }
}

export default Input;
