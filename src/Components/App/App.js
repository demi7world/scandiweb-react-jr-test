import { Component } from 'react';
 
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import AppHeader from '../AppHeader/AppHeader';
import ProductList from '../ProductList/ProductList';


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

	constructor(props) {
		super(props);
		this.state = {
			category: 'all',
			currency: {
				label: 'USD',
				symbol: '$'
			}
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

	render() {
		return (
		<ApolloProvider client={client}>
			<AppHeader 
				onChangeCategory={this.onChangeCategory}
				activeCategory={this.state.category}
				onChangeCurrency={this.onChangeCurrency}
				activeCurrency={this.state.currency.symbol} />
			<ProductList activeCategory={this.state.category}
				currencyLabel={this.state.currency.label} />
		</ApolloProvider>
		);
	}
}

export default App;