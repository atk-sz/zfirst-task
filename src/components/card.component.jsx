import React from 'react';
import './card.style.css'

function Card({ res }) {
    const fUpperCase = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    const { name, sprites, base_experience, moves, id } = res;
    const newName = fUpperCase(name);
    return (
        <div className='card'>
            <div className="image">
            <img src={sprites.front_default} alt="name" />
            </div>
            <div className='name'>
            <h3>Name: {newName}</h3>
            </div>
            <div className="id">
            <h4>ID: {id}</h4>
            </div>
            <div className="para">
            <p>Exp: {base_experience}, Moves: {moves.length}</p>
            </div>
            <a href={`https://pokeapi.co/api/v2/pokemon/${name}`} target='_blank'>Click for more</a>
        </div>
    )
}

export default Card;