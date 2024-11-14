import { createContext, useState, useEffect, useReducer } from "react";


export const CartContext = createContext({
    items: [],
    products: [],
    loading: false,
    error: "",
    addItemToCart: () => { },
    updateItemQuantity: () => { },

});

export default function CartContextProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/products/category/skin-care?limit=12&select=id,thumbnail,title,price,description");

            if (response.ok) {
                const result = await response.json();
                setProducts(result.products);

            } else {
                setError("Fetch FAILED!");
            }
            setLoading(false);
        }

        fetchProducts();
    }, []);

    // Shopping Cart

    function cartReducer(state, action) {
        if (action.type === "ADD_ITEM") {
            const updateItems = [...state.items];

            const existingCartItemIndex = updateItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const existingCartItem = updateItems[existingCartItemIndex];

            if (existingCartItem) {
                const updateItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                }
                updateItems[existingCartItemIndex] = updateItem;
            } else {
                const product = action.payload.products.find(
                    (product) => product.id === action.payload.id

                );
                updateItems.push({
                    id: action.payload.id,
                    thumbnail: product.thumbnail,
                    title: product.title,
                    price: product.price,
                    quantity: 1,

                });
            }
            return { items: updateItems };

        }

        if (action.type === "UPDATE_ITEM") {
            const updateItems = [...state.items];

            const updateItemIndex = updateItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const updateItem = { ...updateItems[updateItemIndex] };

            updateItem.quantity += action.payload.amount;

            if (updateItem.quantity < 1) {
                updateItems.splice(updateItemIndex, 1);

            } else {
                updateItems[updateItemIndex] = updateItem;
            }

            return { ...state, items: updateItems };

        }

        return state;

    }
    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        { items: [] }
    );

    function handleAddItemToCart(id) {
        cartDispatch({
            type: "ADD_ITEM",
            payload: { id, products }
        });

    }

    function handleUpdateCartIemQuantity(id, amount) {
        cartDispatch({
            type: "UPDATE_ITEM",
            payload: { id, amount }
        });

    }

    const ctx = {
        items: cartState.items,
        products: products,
        loading: loading,
        error: error,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartIemQuantity

    };


    return <CartContext.Provider value={ctx}>
        {children}
    </CartContext.Provider>

}




