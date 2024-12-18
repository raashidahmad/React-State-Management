import './App.css';
import { DUMMY_PRODUCTS } from './dummy_products';
import { Header } from './components/Header';
import { Shop } from './components/Shop';
import { Product } from './components/Product';
import { ShoppingCartContextProvider } from './store/shopping-cart-context-provider';

function App() {
  
  return (
    <ShoppingCartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product: any) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </ShoppingCartContextProvider>
  );
}
export default App;
