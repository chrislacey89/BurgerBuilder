import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Orders/CheckoutSummary";
import ContactData from "../ContactData/ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          // pass ingredient state in props
          component={ContactData}
        />
      </div>
    );
  }
}

// this connects to reducer
const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
