import { useContext } from "react";
import { ShoppingCartContext } from "../store/shopping-cart-context";

export const Product = ({
    id,
    image,
    title,
    price,
    description,
  }: any) => {

    const { addItemToCart } = useContext(ShoppingCartContext);
    return (
      <article className="product">
        <img src={image} alt={title} />
        <div className="product-content">
          <div>
            <h3>{title}</h3>
            <p className='product-price'>${price}</p>
            <p>{description}</p>
          </div>
          <p className='product-actions'>
            <button onClick={() => addItemToCart(id)}>Add to Cart</button>
          </p>
        </div>
      </article>
    );
  }
  