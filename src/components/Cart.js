import React from "react";

export default function Cart({ id, thumbnail, title, price, quantity, onUpdateQuantity }) {


    return (
        <div>

            <li key={id}>

            <div>
                <img src={thumbnail} alt={thumbnail}/>
                    <h2>{title}</h2>
                    <p>{price}</p>
                    <div>
                        <button onClick={() => onUpdateQuantity(id, -1)}>-</button>
                        <h2>{quantity}</h2>
                        <button onClick={() => onUpdateQuantity(id, 1)}>+</button>
                    </div>
            </div>

            </li>
            {/* Condição para ver se é > 0 o qtd de itens
        Se for maior redenriza em checkout, se não, não redenriza*/}
        </div>
    );
}