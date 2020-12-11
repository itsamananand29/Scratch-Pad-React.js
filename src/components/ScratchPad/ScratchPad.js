import React, { Component } from 'react';
import Card from './Cards/Card';

class ScratchPad extends Component{
    state = {
        content:[],
        text:[]
    }
    componentDidUpdate(){
        this.setState({content:this.props.content})
    }
    shouldComponentUpdate(nextProps,nextState){
        if (nextProps.content !== this.props.content || nextState.content !== this.state.content){
            // console.log("updated")
            return true
        }
        return false
    }
    
    render(){
        const content = [...this.state.content];
        const text = content.map((txt,idx)=>{
            return <Card key={idx} txt ={txt.note} createdAt={txt.createdAt} deleteClick={()=>this.props.deleteHandler(idx)} editClick={()=>this.props.editHandler(idx)}/>
            })
        // console.log(text,'text');   
        return(
            <div>
                {text}
            </div>
        ) 
    }
}
export default ScratchPad;