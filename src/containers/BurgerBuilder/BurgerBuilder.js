import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/orderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
  
    state = {
        // purchaseable:false, //for order now button
        purchasing:false,
        
    }

componentDidMount(){
   this.props.onInitgredients();
}

updatePurchaseState (ingredients){
  const sum= Object.keys(ingredients)
    .map(igKey =>{
        
        return ingredients[igKey];//ingredients and their value for given key
       
    })
    .reduce((sum,el)=>{
        return sum+el;
    },0);
    return sum>0 ;

}

//COMMENTED BCZ ALL THESEIS PRESENT IN REDUCER
// addIngredientHandler=(type)=>{
// const oldCount=this.state.ingredients[type];//amount of ingredient present
// const updatedCount=oldCount+1;
// const updatedIngredients={
//     ...this.state.ingredients
// };
// updatedIngredients[type]=updatedCount;//a ingredient will be updated after click
// const PriceAddition=INGREDIENT_PRICES[type];//price of a ingredient
// const oldPrice=this.state.totalPrice;
// const newPrice=oldPrice+PriceAddition;
// this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
// this.updatePurchaseState(updatedIngredients);
// }

//COMMENTED BCZ ALL THESEIS PRESENT IN REDUCER
// removeIngeredientHandler=(type)=>{
//     const oldCount=this.state.ingredients[type];
//     if(oldCount<=0){
//         return;
//     }
//     const updatedCount=oldCount-1;
//     const updatedIngredients={
//         ...this.state.ingredients
//     };
//     updatedIngredients[type]=updatedCount;
//     const priceDeduction=INGREDIENT_PRICES[type];
//     const oldPrice=this.state.totalPrice;
//     const newPrice=oldPrice-priceDeduction;
//     this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
//    this.updatePurchaseState(updatedIngredients);
// }


purchaseHandler=()=>{
    if(this.props.isAuthenticated){
        this.setState({purchasing:true});
    }
    else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
    
}
//in this way the this keyword will refer to the class
    
purchaseCancelHandler=()=>{
    this.setState({purchasing:false});
}
purchaseContinueHandler =()=>{
    this.props.onInitPurchase();
    this.props.history.push('./checkout');
}
    // alert('You Continue');

//     this.setState({loading:true})
// const order={
//     ingredients:this.state.ingredients,
//     price:this.state.totalPrice,
//     customer:{
//         name:'jayant',
//         adress:{
//             street:'backstreet',
//             zipcode:'28288',
//             country:'bharat'
//         },
//         email:'jayant@ff.com'
//     },
//     deliveryMethod:'fastest'
// }
//     axios.post('/orders.json',order)
//     .then(response =>{
//         this.setState({loading:false,purchasing:false});
//     })
//         .catch(error=>{
//             this.setState({loading:false,purchasing:false});
//         });

// const queryParams=[];
// for(let i in this.state.ingredients){                                                      //we r trying to get the actual ingredients to show in the checkout pge
//     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i])) //encodeURIComponent encodes my elements so that they can be used in the URL
//                                                                                           //i =property name(salad,cheese..),'=' bcse we have key equal smething in qryprms,this.state.ingredients[i]=for the key we r currently at
// }                                                                                          //in short ,PROPERTY NAME = VALUE OF THE PROPERTY


// queryParams.push  ('price='+this.state.totalPrice) ;//passing total price like this to pass into checkout Component                                                                                   
// const queryString=queryParams.join('&'); //joining string element of the queryparam array by &.

// this.props.history.push({
//     pathname:'/checkout',
//     search:'?'+queryString
// });

render () {
 
        const disabledInfo={
            // ...this.state.ingredients //commented bcz new state is from redux
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
             let orderSummary=null;
        //Spinner
        
        
         let burger =this.props.error ?<p>ingredients can't be loaded</p>:<Spinner />

        //  if(this.state.ingredients){ ( due to redux
        if(this.props.ings){ (
             burger=(
            <Auxiliary>
        <Burger ingredients={this.props.ings} />
           <BuildControls
           ingredientAdded={this.props.onIngredientAdded} 
            ingredientRemoved={this.props.onIngredientREMOVE} 
            disabled={disabledInfo}
            price={this.props.price} //from mapdispatchtoprops
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
          </Auxiliary>)
        );
        orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
    }
    
          
        return (
            <Auxiliary>
                
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
              {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !==null
    };
}

const mapDispatchToProps=dispatch =>{
    return{
        onIngredientAdded:(ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientREMOVE:(ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitgredients:()=>(dispatch(actions.initIngredients())),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}
     



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));