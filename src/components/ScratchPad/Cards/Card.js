import React from 'react';
import Button from '../../Button/Button';
import './Card.css';
const card = props=>{
    
    return (
        <div className='card'>
            <div className='content'>
                <pre>{props.txt}</pre>
            </div>
            <div className='info'>      
                <p className='createdAt'>Created At: {new Date(props.createdAt).toLocaleString("en-US", {timeZone: "Asia/Kolkata"})}</p>
                <Button btnType='Edit' click={props.editClick} >Edit</Button>
                <Button btnType='Delete' click={props.deleteClick}>Delete</Button>
            </div>
            
        </div>
    )

}
export default card;