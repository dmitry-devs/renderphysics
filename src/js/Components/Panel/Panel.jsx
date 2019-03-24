import React, { Component } from 'react';
import Settings from './Settings';
import InformationBlock from './InformationBlock';

class Panel extends Component {
    state = {
        theoryBlock: false,
    };
    componentDidMount() {
        const main = document.querySelector('.app__main');
        main.addEventListener('click', () => this.hideTheory());
    }

    toggleTheory = () => {
        this.setState({
            theoryBlock: !this.state.theoryBlock,
        });
    };
    hideTheory = () => {
        this.setState({
            theoryBlock: false,
        });
    };

    render() {
        return (
            <div className="app__sidebar panel" id={'js-sidebar'}>
                <div className="panel__options">
                    <div className="panel__options-content">
                        <div className="panel__title">{this.props.title}</div>
                        <button className="panel__btn" onClick={this.toggleTheory}>
                            Теория >
                        </button>
                        <Settings
                            item={this.props.item}
                            data={this.props.data}
                            fields={this.props.fields}
                            updateData={this.props.updateData}
                        />
                    </div>
                </div>
                <InformationBlock theory={this.props.theory} show={this.state.theoryBlock} />
            </div>
        );
    }
}

export default Panel;
