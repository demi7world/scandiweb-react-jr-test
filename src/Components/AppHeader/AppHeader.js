import { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import { LOAD_CATEGORIES } from '../../Graphql/Queries';

import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import CartDropdown from '../CartDropdown/CartDropdown';

import './appHeader.css';
import logo from '../../Resources/Img/logo.svg';

export default class AppHeader extends Component {

	onChangeCategory = (e) => {
        const category = e.target.getAttribute('data-active');
        this.props.onChangeCategory(category);
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
											onClick={this.onChangeCategory}
											className="active">
											{category.name}
										</li>
									)
								} else {
									return (
										<li 
											key={categories.indexOf(category)} 
											data-active={category.name}
											onClick={this.onChangeCategory}>
											{category.name}
										</li>
									)
								};

							});
						}}
					</Query>
				</ul>
				<img src={logo} alt="logo" className="logo" />
				<div className="navBlock">
					<CurrencyDropdown 
						onChangeCurrency={this.props.onChangeCurrency}
						activeCurrency={this.props.activeCurrency} />
					<CartDropdown />
				</div>
			</nav>
		</header>
		)
	}
}
