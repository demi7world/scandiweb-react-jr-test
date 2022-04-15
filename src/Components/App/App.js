import { Component } from 'react';
 
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import AppHeader from '../AppHeader/AppHeader';
import ProductList from '../ProductList/ProductList';


import './app.css';
import '../../Resources/Fonts/fonts.css';


const errorLink = onError(({graphqlErrors}) => {
	if (graphqlErrors) {
		graphqlErrors.map(({message}) => {
		return alert(`Graphql error ${message}`)
		});
	}
});

const link = from([
	errorLink,
	new HttpLink({uri: 'http://localhost:4000/graphql'})
]);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link
});

class App extends Component {

	constructor() {
		super();
		this.state = {
			category: 'all',
			currency: {
				label: 'USD',
				symbol: '$'
			},
			cart: {}
		}
	}

	onChangeCategory = (category) => {
		this.setState({category});
	}

	onChangeCurrency = (label, symbol) => {
		this.setState({
			currency: {
				label,
				symbol
			}
		});
	}

	onAddToCart = (productId, number) => {
		const cart = this.state.cart;

		const newCart = {};
		newCart[`${productId}`] = number;

		this.setState({
			cart: {
				...cart,
				...newCart
			}
		});
	}

	// onRemoveFromCart = (productId) => {
	// 	const cart = this.state.cart,
	// 		  index = cart.indexOf(productId);

	// 	console.log(productId);
		
	// 	if (index !== -1) {
	// 		const newCart = cart.splice(index, 1);
	// 		this.setState({
	// 			cart: newCart
	// 		});
	// 	}
	// }

	render() {
		return (
		<ApolloProvider client={client}>
			<div className="app">
				<AppHeader 
					onChangeCategory={this.onChangeCategory}
					activeCategory={this.state.category}
					onChangeCurrency={this.onChangeCurrency}
					activeCurrency={this.state.currency.symbol} />
				<ProductList 
					activeCategory={this.state.category}
					currencyLabel={this.state.currency.label} 
					onAddToCart={this.onAddToCart}
					cart={this.state.cart} />
			</div>
		</ApolloProvider>
		);
	}
}

export default App;