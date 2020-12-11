import React,{Component} from 'react';
import ScratchPad from '../../components/ScratchPad/ScratchPad';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import axios from 'axios';
import SuggestedWord from '../../components/SuggestedWord/SuggestedWord';
import './TypePad.css'
class TypePad extends Component{
    state={
        content :[],
        textInput :'' ,
        editing:false,
        editIndex:null,
        words: [],
        suggestions: []
    }
    componentDidMount(){
        axios.get('http://localhost:8080/admin/notes')
            .then(response=>response.data)
            .then(data=>{
                // console.log(data)
                this.setState({content:data.content});
                this.wordsSuggestion();
            })
            .catch(err=>new Error('Server Error'))    
    }
    wordsSuggestion = () => {
        let words = [];
        for (let i=0; i<this.state.content.length; i++) {
            words = words.concat(this.state.content[i].note.split(" "))
        }
        words = words.map(val => {
            if (val.endsWith(".") || val.endsWith(",")||val.endsWith("?")||val.endsWith("?")||val.endsWith("!")||val.endsWith("@")||val.endsWith("#")) {
                return val.substring(0, val.length-1)
            }
            return val
        })
        this.setState({words: [...new Set(words)]},
        // console.log('words',words)
        );
    }

    onChangeHandler = event=>{
        const len = event.target.value.split(" ").length
        const lastWord = event.target.value.split(" ")[len-1]
        if (lastWord !== '' && lastWord.length >= 3) {
            const suggestions = this.state.words.filter(val => {
                
                if (val.toLowerCase().startsWith(lastWord.toLowerCase())) {
                    return true;
                }
            })
            this.setState({suggestions: suggestions});
        }
        else {
            this.setState({suggestions: []});
        }
        this.setState({textInput:event.target.value});
      
    }
    submitContentHandler =()=>{
        const content = [...this.state.content];
        const notes = {
            note:this.state.textInput,
            createdAt:Date.now()
        }
        if(this.state.textInput.length>0){
        if(this.state.editing){
            // console.log("id",content[this.state.editIndex]._id)
            axios.put('http://localhost:8080/admin/notes/'+ content[this.state.editIndex]._id,{notes:notes})
            .then(response=>{
                // console.log(content,"content")
            content[this.state.editIndex].note=this.state.textInput;
            this.setState({content:content,textInput:'',editing:false})
            })

        }
        else{
            
            axios.post('http://localhost:8080/admin/notes',{notes:notes})
            .then(response=>{
                content.push(response.data.notes)
               })
            .then(()=>this.setState({content:content},()=>{
               this.setState({textInput:''})
               this.wordsSuggestion(); 
            }))
            .catch(err=>new Error(err))
            
        }
         
        
        }
        
    }
    clearContentHandler=()=>{
        this.setState({textInput:''})
    }
    deleteHandler = (index)=>{
        const content = [...this.state.content];
        // console.log(content[index]._id);
        axios.delete('http://localhost:8080/admin/notes/'+ content[index]._id)
        .then((response)=>{
            const content = [...this.state.content].filter((txt,idx)=>idx !== index);
            // console.log(content,"delete")
            this.setState({content:content})
        })
        
    }
    editHandler=index=>{
        const text = this.state.content.find((txt,idx)=>idx === index);
        // console.log(text);
        this.setState({textInput:text.note,editing:true,editIndex:index});

    }
    render(){
        const suggestion = this.state.suggestions.map((word,idx)=>{
            if(idx < 5){
                return <SuggestedWord key={idx}>{word}</SuggestedWord>
            }
        })
        return (
            <div>
                <br/>
                <header>
                    <nav>
                        ScratchPad
                    </nav>
                </header>
                {this.state.textInput.length >=3? (suggestion.length>0?suggestion:<div>&nbsp;</div>):<div>&nbsp;</div>}
                <Input change={this.onChangeHandler} value={this.state.textInput}/>
                <Button click={this.submitContentHandler} btnType='Submit'>Submit</Button>
                <Button click={this.clearContentHandler} btnType='Clear'>Clear</Button>
                
                <ScratchPad content={this.state.content} deleteHandler={this.deleteHandler} editHandler={this.editHandler}/>
            </div>

        )
    }
}
export default TypePad;