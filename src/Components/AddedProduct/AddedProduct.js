import { Component } from 'react';

import './addedProduct.css';

import plus from '../../Resources/Img/plus.svg';
import minus from '../../Resources/Img/minus.svg';

export default class AddedProduct extends Component {
  render() {
    return (
        <article className="product">
            <div>
                <h1 className="product__title">Apollo Running Short</h1>
                <p className="product__price">$50.00</p>
                <div className="product__chooseSize">
                    <button>S</button>
                    <button>M</button>
                </div>
            </div>
            <div className="product__rightContainer">
                <div className="product__number">
                    <button><img src={plus} /></button>
                    <span>1</span>
                    <button><img src={minus} /></button>
                </div>
                <div className="product__preview"></div>
            </div>
        </article>
    )
  }
}
