import './App.css';
import React, { useState, useEffect } from 'react';
import baconEggs from './images/plate__bacon-eggs.png';
import salmon from './images/plate__salmon-vegetables.png';
import spaghetti from './images/plate__spaghetti-meat-sauce.png';
import fries from './images/plate__french-fries.png';
import chicken from './images/plate__chicken-salad.png';
import fish from './images/plate__fish-sticks-fries.png';
import check from './images/check.svg';
import chevron from './images/chevron.svg'

const menuItems = [
  {
      name: 'French Fries with Ketchup',
      price: 2.23,
      image: fries,
      alt: 'French Fries',
      count: 0
  },
  {
      name: 'Salmon and Vegetables',
      price: 5.12,
      image: salmon,
      alt: 'Salmon and Vegetables',
      count: 0
  },
  {
      name: 'Spaghetti Meat Sauce',
      price: 7.82,
      image: spaghetti,
      alt: 'Spaghetti with Meat Sauce',
      count: 0
  },
  {
      name: 'Bacon, Eggs, and Toast',
      price: 5.99,
      image: baconEggs,
      alt: 'Bacon, Eggs, and Toast',
      count: 0
  },
  {
      name: 'Chicken Salad with Parmesan',
      price: 6.98,
      image: chicken,
      alt: 'Chicken Salad with Parmesan',
      count: 0
  },
  {
      name: 'Fish Sticks and Fries',
      price: 6.34,
      image: fish,
      alt: 'Fish Sticks and Fries',
      count: 0
  }
];


function App() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const renderButton = item => {
    const itemInCart = cart.find(i => i.name === item.name);

    if (itemInCart) {
      return (
        <button 
          className="in-cart"
          onClick={() => addToCart(item)}
        >
          <img src={check} alt="Check" />
          In Cart
        </button>
      );
    } else {
      return (
        <button 
          className="to-cart"
          onClick={() => addToCart(item)}
        >
          Add to cart
        </button>
      );
    }
    
  }

  const increment = item => {
    const tempCart = [...cart];
    const itemIndex = cart.findIndex( i => i.name === item.name);
    tempCart[itemIndex].count += 1;
    setCart(tempCart);
  }

  const decrement = item => {
    const tempCart = [...cart];
    const itemIndex = cart.findIndex( i => i.name === item.name);
    if (tempCart[itemIndex].count > 0 ){
      tempCart[itemIndex].count -= 1;
      setCart(tempCart);
    }
  }

  const addToCart = item => {
    const itemInCart = cart.find(i => i.name === item.name);

    if (itemInCart) {
      increment(item);
    } else {
      item.count += 1;
      setCart([...cart, item]);
    }
  }

  const clearCart = () => {
    setCart([]);
  }

  const remove = (item) => {
    const tempCart = [...cart];
    const itemIndex = cart.findIndex( i => i.name === item.name);
    tempCart.splice(itemIndex, 1);
    setCart(tempCart);
  }

  useEffect(() => {
    const calculateSubtotal = () => {
      const sub = cart.reduce((acc, current) => {
        return acc + current.price * current.count;
      }, 0)
  
      setSubtotal(Number.parseFloat(sub).toFixed(2));
    }
  
    const calculateTax = () => {
      const taxRate = 0.0975;
      setTax(Number.parseFloat(subtotal * taxRate).toFixed(2));
    }
  
    const calculateTotal = () => {
      const sum = Number.parseFloat(subtotal) + Number.parseFloat(tax);
      setTotal(sum.toFixed(2));
    }
    
    calculateSubtotal();
    calculateTax();
    calculateTotal();
  }, [cart, subtotal, tax])

  return (
    <body>
      <div className="wrapper menu">
        <div className="panel">
          <h1>To Go Menu</h1>
          <ul className="menu">
            {menuItems.map( item => (
              <li>
                <div className="plate">
                  <img src={item.image} alt={item.alt} className="plate" />
                </div>
                <div className="content">
                  <p className="menu-item">{item.name}</p>
                  <p className="price">{`$${item.price}`}</p>
                  {renderButton(item)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel cart">
          <h1>Your Cart</h1>
          {cart.length === 0 
            ? (
                <p className="empty">Your cart is empty.</p>
            )
            : (
              <React.Fragment>
                <p className="clearCart" onClick={() => clearCart()}>Clear cart</p> 
                <ul className="cart-summary">
                  {cart.map(item => (
                    <li>
                      <div className="plate">
                        <img src={item.image} alt={item.alt} className="plate" />
                      </div>
                      <div className="content">
                        <p className="menu-item">{item.name}</p>
                        <p className="price">{`$${item.price}`}</p>
                      </div>
                      <div className="quantity__wrapper">
                        <button 
                          className="decrease"
                          onClick={() => decrement(item)}
                        >
                          <img src={chevron} alt=""/>
                        </button>
                        <div className="quantity">{item.count}</div>
                        <button 
                          className="increase"
                          onClick={() => increment(item)}
                        >
                          <img src={chevron} alt=""/>
                        </button>
                      </div>
                      <div className="subtotal">
                        {`$${(item.price * item.count).toFixed(2)}`}
                      </div>
                      {item.count === 0 && (
                        <p className="removeItem" onClick={() => remove(item)}>Remove item </p>
                      )}
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            )
          }

          <div className="totals">
            <div className="line-item">
              <div className="label">Subtotal:</div>
              <div className="amount price subtotal">{`$${subtotal}`}</div>
            </div>
            <div className="line-item">
              <div className="label">Tax:</div>
              <div className="amount price tax">{`$${tax}`}</div>
            </div>
            <div className="line-item total">
              <div className="label">Total:</div>
              <div className="amount price total">{`$${total}`}</div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
