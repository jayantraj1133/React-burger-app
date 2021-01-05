import React from 'react';
import classes from './Input.css';

const input=(props)=>{
    let inputElement =null;
    const inputClasses=[classes.InputElement];

    if(props.invalid &&  props.shouldValidate && props.touched){ //shouldValidate is used to no to show red color in delivery
        inputClasses.push(classes.Invalid);
    }

switch(props.elementType){
    case('input'):
    inputElement=<input 
    className={inputClasses.join(' ')} //to concatenate all string class into one long string whic are separated
     {...props.elementConfig}
     value={props.value}  
     onChange={props.changed}/>; //any default html attribute can be set to input,simple pass the normal prps u want to pass from outside like{...props}
    break;

    case('textarea'):
    inputElement= <textarea  
    className={inputClasses.join(' ')} 
    {...props.elementConfig}
    value={props.value}
     onChange={props.changed}/>;
     break;

     case('select'):
     inputElement=(
     <select
     className={inputClasses.join(' ')}
     value={props.value} onChange={props.changed}> 

        {props.elementConfig.options.map(option => (
          <option key={option.value} value ={option.value}>
              {option.displayValue}
          </option>
          
        ))}
     </select>
     );
     break;

     default:
         inputElement=<input 
          className={inputClasses.join(' ')} 
          {...props.elementConfig} 
          {...props.value}/>;
}

    return(
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
    );


};

export default input;