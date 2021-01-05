import React from 'react';
import classes from './Button.css';

const button =(props)=>(
<button
disabled={props.disabled}
className={[classes.Button,classes[props.btnType]].join(' ')} //dynamically pullout certain types,btnType can be Success or Danger
onClick={props.clicked}>{props.children}</button>
);


export default button;