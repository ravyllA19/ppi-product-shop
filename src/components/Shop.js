import { useContext } from "react";
import Product from "./Product";
import { CircularProgress } from "@mui/material";
import { CartContext } from "./context/CartContext";
import styles from "./Shop.module.css";


export default function Shop() {

    const { products, loading, error } = useContext(CartContext);

    return (
        <section id="shop">
            <h2>Elegant Products for Everyone</h2>

            <div className={styles.search_container}>
                <div className={styles.search_box}>
                    <input />
                    <button>CLEAR</button>
                </div>
            </div>



            <ul id="products">
                {error && <p>{error}</p>}
                {!loading && products ? (
                    products.map((product) => (
                        <li key={product.id}>
                            <Product {...product} />
                        </li>
                    ))
                ) : (
                    <div id="loading">
                        <CircularProgress size="10rem" color="inherit" />
                        <p>Loading products...</p>
                    </div>
                )}
            </ul>

        </section>
    );
}