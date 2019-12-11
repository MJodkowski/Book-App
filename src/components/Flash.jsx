import React, { Component } from "react";
import { connect } from "react-redux";
import { Chip } from "react-materialize";

class Flash extends Component {
  render() {
    let classes = "white-text center-align transparent";
    if (this.props.flash) {
      switch (this.props.flashType) {
        case "success":
          classes = "white-text center-align success-message";
          break;
        case "error":
          classes = "white-text center-align error-message";
          break;
        default:
      }
    }
    return <Chip className={classes}>{this.props.message}</Chip>;
  }
}

const mapStateToProps = state => {
  return {
    flash: state.flash.flash,
    flashType: state.flash.flashType
  };
};

export default connect(mapStateToProps, null)(Flash);
