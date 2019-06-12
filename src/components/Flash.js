import React, { Component } from 'react';
import { connect } from 'react-redux';

class Flash extends Component {
    render() {
        let classes = 'chip white-text center-align transparent';
        if (this.props.flash) {
            switch (this.props.flashType) {
                case 'success':
                    classes = 'chip white-text center-align success-message';
                    break;
                case 'error':
                    classes = 'chip white-text center-align error-message';
                    break;
            }
        }
        return (
            <div className={classes}>
                {this.props.message}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        flash: state.flash.flash,
        flashType: state.flash.flashType
    }
}

export default connect(mapStateToProps, null)(Flash);
