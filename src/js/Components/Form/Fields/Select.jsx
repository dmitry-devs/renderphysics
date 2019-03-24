import React, { Component } from 'react';
import Label from '../Label';
class Select extends Component {

    render() {
        const options = this.props.options;
        return (
            <div className="form-control">
                <Label value={this.props.label} />
                <select
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                    className="form-control__field"
                >
                    {Object.keys(options).map(key => (
                        <option value={key} key={key}>
                            {options[key]}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default Select;
