import React from 'react';
import './Button.css'
const button = props =>{
    return (
      
            <button className={props.btnType} onClick={props.click}>
                {props.children}
            </button>
          
    )
}
export default button;