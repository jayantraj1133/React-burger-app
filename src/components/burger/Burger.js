import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger =(props)=>{

let transformedIngredients=Object.keys(props.ingredients) //gives the property name like salad,meat in strings
.map(igKey =>{

   return [...Array(props.ingredients[igKey])] //transform string value into array as we have as many ingredients  for a given ingredient
     .map((_, i)=>{

return <BurgerIngredient key={igKey +i} type={igKey} />
});
  })
  .reduce((arr,el)=>{
      return arr.concat(el)
  },[]); //this method is alternate to push ingredients into array another is in order component,this is long method

 if(transformedIngredients.length===0){
     transformedIngredients=<p>ADD ingredients to your Burger</p>
 }

return(
<div className={classes.Burger}>
<BurgerIngredient type="bread-top"/>
{transformedIngredients}
<BurgerIngredient type="bread-bottom" /> 
</div>
);

};

export default burger;