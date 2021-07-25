import React, {useEffect, useState} from "react";
import axios from 'axios';

function Cards() {
    const [cards, setCards] = useState ( [{
        title: '',
        content: '',
        image: '',
        _id: ''
    }])

    useEffect(() => {
        fetch("/cards").then(res => {
            if(res.ok) {
                return res.json()
            }
        }).then(jsonRes => setCards(jsonRes));
    }) 

    function deleteCard(id) {
        axios.delete('/delete/' + id)
        alert('card deleted');
        console.log(`Deleted card with id ${id}`)
    }

    const [isPut, setIsPut] = useState(false);
    const [updatedCard, setUpdatedCard] = useState({
        title: "",
        content: "",
        image: "",
        id: ""
    })

    function openUpdate(id) {
        setIsPut(true);
        setUpdatedCard((prevCard) => {
            return {
                ...prevCard,
                id: id,
            }
        })

    }


    return <div className="container">
        <h1> Cute Animal Cards</h1>
        {cards.map(card =>
            
            <div class="h-100 row align-items-center">
            <div class="card w-75">
            <div class="card-body">
            <div key={card._id} class="card" styles="width: 18rem;">
            <img class="card-img-top" src={card.image} alt="Card image cap"></img>
            <h5 class="card-title">{card.title}</h5>
            <p class="card-text">{card.content}</p>
            <button onClick={() => deleteCard(card._id)} type="button" class="btn btn-danger btn-sm">Delete</button>
            <button onClick={() => openUpdate(card._id)} type="button" class="btn btn-warning btn-sm">Edit</button>
            </div>
            </div>
            </div>
            </div>
            )}
    </div>
}

export default Cards;