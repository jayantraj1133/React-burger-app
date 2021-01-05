import React,{Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
 render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
        return <li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
        </li>;//igKey represent name of ingredients AND props.ingredientsp[igKey] amount of ingredints
        })
        return(
<Auxiliary>
<h3>Your Order</h3>
<p>A delecious burger with the following Ingredients:</p>
<ul>
{ingredientSummary}
</ul>
<p>Continue to Check Out</p>
<p><strong>Price of burger is : {this.props.price.toFixed(2)}</strong></p>
<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
<Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
</Auxiliary>

        );
    }
} 


export default OrderSummary;