import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FieldsFactory from '../Form/FieldsFactory';
import { Validation } from '../Form/Validation';

class Settings extends Component {
    state = {
        item: this.props.item,
        fields: this.props.fields,
    };

    handleChange = name => event => {
        this.state.item[name] = event.target.value;
        this.forceUpdate();
    };
    onBlur = name => event => {
        this.state.item[name] = Validation.getConfines(event.target.value, this.state.fields[name]);
        this.forceUpdate();
    };
    init = () => this.props.updateData(this.state.item);
    stop = () => this.props.updateData(false);

    render() {
        const fields = this.state.fields;
        return (
            <div className="settings">
                <div className="settings__title">Параметры</div>
                <div className="settings__field">
                    {Object.keys(fields).map((key, i) => (
                        <FieldsFactory
                            key={i}
                            data={fields[key]}
                            value={this.state.item[key]}
                            onChange={this.handleChange(key)}
                            onBlur={this.onBlur(key)}
                        />
                    ))}
                </div>
                <ReactCSSTransitionGroup
                    transitionName="button"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    <button onClick={this.init} className="settings__button btn btn--secondary">
                        Запустить
                    </button>
                    {this.props.data ? (
                        <button onClick={this.stop} className="settings__button btn btn--tertiary">
                            Стоп
                        </button>
                    ) : (
                        ''
                    )}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Settings;
