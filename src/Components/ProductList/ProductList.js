import { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import { LOAD_PRODUCTS_BY_CATEGORY } from '../../Graphql/Queries';

import './productList.css';

export default class ProductList extends Component {

	onAddToCart = (e) => {
		const productId = e.target.getAttribute('data-add'),
			  cart = this.props.cart;
		let number;

		if (cart.hasOwnProperty(productId)) {
			console.log('ok');
			number = cart[`${productId}`] + 1;
		} else {
			number = 1;
		}
		
		this.props.onAddToCart(productId, number);
	}

	render() {

		const title = this.props.activeCategory;
		
		return (
			<section className="productList">
				<Query query={LOAD_PRODUCTS_BY_CATEGORY} variables={{title}}>
					{({loading, data}) => {
						if (loading) {
							return "Loading..";
						}

						const {category} = data,
							  {products} = category;

						const isInStock = (product) => {
							return (
								<>
								<div className="productCard__imgContainer">
									<img className="productCard__preview" src={product.gallery[0]} alt={product.name} />
								</div>
								<button 
									className="toCartBtn" 
									data-add={product.id}
									onClick={this.onAddToCart}></button>
								</>
							)	
						}

						const outOfStock = (product) => {
							return (
								<div className="productCard__imgContainer">
									<img className="productCard__preview" src={product.gallery[0]} alt={product.name} />
									<div className="productCard__outOfStock">out of stock</div>
								</div>
							)	
						}

						return (
							<>
								<h1 className="categoryName">{category.name}</h1>
								<div className="productList_container">
									{products.map(product => {

										const price = product.prices.find(price => price.currency.label === this.props.currencyLabel);

										return (
											<article key={product.id} className="productCard">
												
												{product.inStock ? isInStock(product) : outOfStock(product)}

												<h1 className="productCard__name">{product.name}</h1>
												<p className="productCard__price">{price.currency.symbol}{price.amount}</p>
											</article>
										);
									})}
								</div>
							</>
						);
					}}
				</Query>
			</section>
		)
	}
}
