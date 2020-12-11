import React from 'react';
import './Input.css'
const input = props=>{
    // console.log(props.value)
    return(
        <div className='input'>
            <textarea placeholder="Type here ......" onChange={props.change} rows={5} cols={50} value={props.value} />
        </div>
        
    )
}
export default input;