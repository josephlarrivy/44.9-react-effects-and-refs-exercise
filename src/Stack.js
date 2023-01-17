import React, { useState, useRef, useEffect } from "react";
import Card from './Card'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const Stack = () => {

    const [deck, setDeck] = useState();
    const [cards, setCards] = useState([]);
    const [displayCard, setDisplayCard] = useState();
    const [autoDraw, setAutoDraw] = useState(false);
    const [counter, setCounter] = useState(null);



    useEffect(function createNewDeck() {

        async function start() {
            try {
                let request = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle");
                setDeck(request.data.deck_id)
                console.log(deck)

                let secondRequest = await axios.get(`https://deckofcardsapi.com/api/deck/${request.data.deck_id}/draw/?count=1`);
                let drawnCard = secondRequest.data.cards[0]
                setCards(cards => [...cards,
                {
                    id: drawnCard.code,
                    image: drawnCard.image
                }]);
            } catch (e) {
                return console.log(e)
            }
        }
        start();
        console.log(deck)
        console.log(cards)

    }, [])


    async function draw() {
        try {
            let request = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
            let drawnCard = request.data.cards[0]
            setCards(cards => [...cards,
                {
                    id: drawnCard.code,
                    image: drawnCard.image
                }]);
            let cardToShow = cards[cards.length - 1];
            setDisplayCard(cardToShow.image);
        } catch (e) {
            return console.log(e)
        }
    }










    


    // const [autoDraw, setAutoDraw] = useState(false);
    // const [counter, setCounter] = useState(null);


    useEffect(() => {
        let interval;
        if (autoDraw) {
            interval = setInterval(() => {
                console.log('In setInterval');
                draw();
            }, 1000);
            setCounter(100)
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [autoDraw]);

    



















    async function handleClick(evt) {
        evt.preventDefault();
        // const btn = evt.target
        await draw();
        
    }

    const handleClick2 = () => {
        setAutoDraw(on => !on);
        console.log(autoDraw)
    }


{
    if (cards.length == 52) {
        return (
            <>
                <h1>Error: no cards remaining!</h1>
            </>
        )
    } else {
        return (
            <div>
                <Card imgSource={displayCard}/>
                <br></br>
                <button onClick={handleClick}>Draw Card</button>
                <button onClick={handleClick2}>Automatically draw</button>
            </div>
        )
    }
}
}


export default Stack;