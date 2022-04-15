import { Component } from 'react';

import AddedProduct from '../AddedProduct/AddedProduct';

import './cartDropdown.css';

export default class CartDropdown extends Component {
    render() {
        return (
        <div className="cart">
            <button className="cart__mainBtn">
                <div className="cart__counter">2</div>
            </button>
            <div className="cart__bg">
                <div className="cart__dropdown">
                    <h1 className="cart__title">My Bag<span className="cart__itemsCounter">, 2 items</span></h1>
                    <div className="cart__goodsContainer">
                       <AddedProduct /> 
                    </div>
                    <div className="cart__total">
                        <span className="cart__totalTitle">Total</span>
                        <span className="cart__totalPrice">$100.00</span>
                    </div>
                    <div className="cart_btnsContainer">
                        <button className="cart_btn">View bag</button>
                        <button className="cart_btn">Check out</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
