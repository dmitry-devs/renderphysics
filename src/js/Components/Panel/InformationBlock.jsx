import React, { Component } from 'react';

class InformationBlock extends Component {
    render() {
        return (
            <div className={`description ${this.props.show ? 'description-open' : ''}`}>
                <div className="description__back">
                    <i className="fa fa-arrow-left" aria-hidden="true" />
                </div>
                <div className="description__content">
                    <div>
                        <span className="description__content-entity">Теория</span>
                        <h3 className="description__content-title">{this.props.theory.title}</h3>
                        <span dangerouslySetInnerHTML={{ __html: this.props.theory.text }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InformationBlock;
