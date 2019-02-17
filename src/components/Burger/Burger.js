import React from "react";

import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // key() pulls first value in object to create new array with just ingredient string names
  // map runs a function across the array to find all the ingredients
  // ... takes old array & combines it with Array(props.ingredients[igKey]) to get the length of the array
  // We now have a multi dimensional array
  // .map(_, i) then returns the index of the ingredient

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })

    .reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
