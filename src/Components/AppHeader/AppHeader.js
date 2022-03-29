import { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import { LOAD_CATEGORIES } from '../../Graphql/Queries';

import './appHeader.css';
import logo from '../../Resources/Img/logo.svg';
import cart from '../../Resources/Img/cart.svg';

export default class AppHeader extends Component {

	onChooseCategory = (e) => {
        const category = e.target.getAttribute('data-active');
        this.props.onChooseCategory(category);
    }

	render() {

		return (
		<header>
			<nav>
				<ul className="navList">
					<Query query={LOAD_CATEGORIES}>
						{({loading, data}) => {
							if (loading) {
								return "Loading..";
							}

							const {categories} = data;

							return categories.map(category => {

								if (category.name === this.props.activeCategory) {
									return (
										<li 
											key={categories.indexOf(category)} 
											data-active={category.name}
											onClick={this.onChooseCategory}
											className="active">
											{category.name}
										</li>
									)
								} else {
									return (
										<li 
											key={categories.indexOf(category)} 
											data-active={category.name}
											onClick={this.onChooseCategory}>
											{category.name}
										</li>
									)
								};

							});
						}}
					</Query>
				</ul>
				<img src={logo} alt="logo" className="logo" />
				<ul className="navList">
					<li>$</li>
					<li><img src={cart} alt="cart" /></li>
				</ul>
			</nav>
		</header>
		)
	}
}
