import { Component } from 'react';
 
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import AppHeader from '../AppHeader/AppHeader';
import ProductList from '../ProductList/ProductList';


const errorLink = onError(({graphqlErrors}) => {
	if (graphqlErrors) {
		graphqlErrors.map(({message}) => {
		alert(`Graphql error ${message}`)
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
			category: 'all'
		}
	}

	onChooseCategory = (category) => {
		this.setState({category});
	}

	render() {
		return (
		<ApolloProvider client={client}>
			<AppHeader 
				onChooseCategory={this.onChooseCategory}
				activeCategory={this.state.category} />
			<ProductList activeCategory={this.state.category} />
		</ApolloProvider>
		);
	}
}

export default App;