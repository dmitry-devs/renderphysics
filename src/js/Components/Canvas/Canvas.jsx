import React, { Component } from 'react';

class Canvas extends Component {
    render() {
        return (
            <div className="app__main">
                <div className="content content--fixed">
                    <div className="debug">
                        <div className="timescale-wrap" />
                    </div>
                </div>
                <div className="loader" />
            </div>
        );
    }
}

export default Canvas;
