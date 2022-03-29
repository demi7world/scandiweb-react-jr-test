import { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import { LOAD_PRODUCTS_BY_CATEGORY } from '../../Graphql/Queries';

import './productList.css';

export default class ProductList extends Component {

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

						return (
							<>
								<h1 className="categoryName">{category.name}</h1>
								<div className="productList_container">
									{
									products.map(product => {
										return (
											<article key={product.id} className="productCard">
												<div className="productCard__imgContainer">
													<img className="productCard__preview" src={product.gallery[0]} alt={product.name} />
												</div>
												<h1 className="productCard__name">{product.name}</h1>
												<p className="productCard__price">$50.00</p>
											</article>
										);
									})
									}
								</div>
							</>
						);
					}}
				</Query>
			</section>
		)
	}
}
