import { Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { useContext } from "react";
import Cart from "./Cart";

export default function Checkout() {

    const { items, updateItemQuantity } = useContext(CartContext);


    const totalprice = items.reduce(
        (total, item) => total + item.price * item.quantity, 0

        
    );

    return (
        <section className="checkout">
            <h2>Checkout</h2>

{/* id para css */}

            <ul id="products" >
                {items.length > 0 ? (
                    items.map((product) => (
                        <li key={product.id}>
                            <Cart 
                                id={product.id} 
                                thumbnail={product.thumbnail} 
                                title={product.title} 
                                price={product.price} 
                                quantity={product.quantity}
                                onUpdateQuantity={updateItemQuantity}
                            />
                        </li>
                    ))
                ) : (
                    <p>No items in cart!</p>
                )}
            </ul>

            <h1>total price: ${totalprice.toFixed(2)} 
            </h1>
           

            <Link to="/" className="product-actions">
                <button>RETURN</button>
            </Link>
        </section>
    );
    
}