import React, { Component } from 'react';
import Input from './Fields/Input';
import Select from './Fields/Select';
import Slider from './Fields/Slider';

class FieldsFactory extends Component {
    definitionTypeField = () => {
        const data = this.props.data;
        switch (data.type) {
            case 'input':
                return (
                    <Input
                        label={data.label}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                );
            case 'select':
                return (
                    <Select
                        label={data.label}
                        options={data.options}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                );
            case 'range':
                return (
                    <Slider
                        label={data.label}
                        type={data.type}
                        range={data.range}
                        step={data.step}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                    />
                );
        }
    };
    render() {
        return <div>{this.definitionTypeField()}</div>;
    }
}

export default FieldsFactory;
