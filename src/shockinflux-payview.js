import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class shockinfluxPayview extends Component {
  constructor(props) {
    super(props);
    this.payWithShockinflux = this.payWithShockinflux.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.state = {
      scriptLoaded: null,
      text: this.props.text || "Make Payment",
      currency: this.props.currency || "ngn",
      template: this.props.template || "modern",
      language: this.props.language || "en",
      action: this.props.action || "float",
      country: this.props.country || "ng"
    };
  }

  componentDidMount() {
    this.setState({
      scriptLoaded: new Promise(resolve => {
        this.loadScript(() => {
          resolve();
        });
      })
    });
  }

  loadScript(callback) {
    const script = document.createElement("script");
    script.src = 'https://scripts-cdn.boxedall.com/shockinflux/v2/payview/js/shockpaymentv2_client.js';
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // Others
      script.onload = () => {
        callback();
      };
    }
  }

  payWithShockinflux() {
    this.state.scriptLoaded &&
      this.state.scriptLoaded.then(() => {
        window.shock_payview({
          email: this.props.email,
          amount: this.props.amount,
          currency: this.state.currency,
          template: this.state.template,
          language: this.state.language,
          action: this.state.action,
          transactionid: this.props.transactionid,
          storeid: this.props.storeid,
          comment: this.props.currency,
          onclose: () => this.props.close(),
          callback: response => this.props.callback(response)
        });
      });
  }

  render() {
    const CustomTag = `${this.props.tag}`;

    return (
      <Fragment>
        <CustomTag className={this.state.class} onClick={this.payWithShockinflux}>
          {this.state.text}
        </CustomTag>
      </Fragment>
    );
  }
}

shockinfluxPayview.defaultProps = {
  tag: "button"
};

shockinfluxPayview.propTypes = {
  email: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string,
  template: PropTypes.string,
  language: PropTypes.string,
  action: PropTypes.string,
  transactionid: PropTypes.string.isRequired,
  storeid: PropTypes.string.isRequired,
  comment: PropTypes.string,
  country: PropTypes.string,
  callback: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default shockinfluxPayview;
