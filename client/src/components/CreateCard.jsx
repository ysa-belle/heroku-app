import React, {useState,useEffect} from "react";
import "./CreateCard.css";
import axios from "axios";
import { withRouter } from "react-router-dom";

function CreateCard(props) {
    const [input, setInput] = useState({
        title: '',
        content: '',
        image: ''

    })

    const [cards, setCards] = useState([
        {
        title: " ",
        content: " ",
        image: " "
        }
    ])

    useEffect( () => {
        fetch("/cards").then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then(jsonRes => setCards(jsonRes))
        .catch(err => console.log(err));
    }, [cards])

    function handleChange(event) {
        const{name,value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event) {
        event.preventDefault();
        console.log(input);
        const newCard = {
            title: input.title,
            content: input.content,
            image: input.image
        }
        axios.post('/create', newCard)
        alert('card added')
        setInput({
            title: " ",
            content: " ",
            image: " "
        })
        props.history.push("/cards");
    }
    return <div className="container">
        <h1> Create Card</h1>
        <form>
            <div class="form-group">
            <label for="exampleInputName">Card Title</label>
            <input onChange={handleChange} name="title" value = {input.title} type="string" class="form-control" id="exampleInputEmail1"  placeholder="Enter name"></input>
            </div>
            <div class="form-group">
            <label for="exampleFormControlTextarea1">Input description</label>
            <textarea onChange={handleChange} name="content" value = {input.content} class="form-control" id="exampleFormControlTextarea1" placeholder="Card content" rows="3"></textarea>
            </div>

          <div class="form-group">
          <label for="exampleInputName">Image link</label>
          <input onChange={handleChange} name="image" value = {input.image} type="string" class="form-control" id="exampleInputEmail1"  placeholder="Enter image link"></input>
          </div>

            
        </form>
        <button onClick={handleClick} type="submit" class="btn btn-primary">ADD CARD</button>

        
    </div>

    
}

export default CreateCard;