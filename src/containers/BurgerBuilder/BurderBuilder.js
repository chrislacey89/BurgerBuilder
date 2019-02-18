import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,

    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-8e6e3.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })

      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    //get count for each number of ingredient
    const oldCount = this.state.ingredients[type];
    // every time we click the ADD button we update the old count by 1
    const updatedCount = oldCount + 1;
    // clone the state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    //update cloned state with new count
    updatedIngredients[type] = updatedCount;

    // get price of ingredient we want to add
    const priceAddition = INGREDIENT_PRICES[type];
    // clone price
    const oldPrice = this.state.totalPrice;
    // every time we click the ADD button we update the old count by cost of ingredient
    const newPrice = oldPrice + priceAddition;

    // update state with new ingredient numbers and total price
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    //get count for each number of ingredient
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    // every time we click the ADD button we update the old count by 1
    const updatedCount = oldCount - 1;
    // clone the state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    //update cloned state with new count
    updatedIngredients[type] = updatedCount;

    // get price of ingredient we want to add
    const priceDeduction = INGREDIENT_PRICES[type];
    // clone price
    const oldPrice = this.state.totalPrice;
    // every time we click the ADD button we update the old count by cost of ingredient
    const newPrice = oldPrice - priceDeduction;

    // update state with new ingredient numbers and total price
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purhaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("You continue!");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Chris Lacey",
        address: {
          street: "Test Ave 1",
          zipcode: 47401,
          country: "USA"
        },
        email: "test@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      //will tell us if it is true or false
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purhaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purhaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
