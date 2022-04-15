import React, { Component } from 'react';

import { Query } from '@apollo/client/react/components';
import { LOAD_CURRENCIES } from '../../Graphql/Queries';

import './currencyDropdown.css';

class CurrencyDropdown extends Component {

    getDropdownMenu = (node) => {
        this.dropdownMenu = node;
    }

    getDropdownBtn = (node) => {
        this.dropdownBtn = node;
    }

    getDropdownArrow = (node) => {
        this.dropdownArrow = node;
    }

    toggleMenu = () => {
        this.dropdownMenu.classList.toggle('active');
        this.dropdownArrow.classList.toggle('turn');
    }

    onChangeCurrency = (e) => {
        const label = e.target.getAttribute('data-label'),
              symbol = e.target.getAttribute('data-symbol');

        this.props.onChangeCurrency(label, symbol);
        this.toggleMenu();
    }

    onClickDropdownBtn = (e) => {
        e.stopPropagation();
        this.toggleMenu();
    };

    componentDidMount() {
        document.addEventListener('click', e => {
            const target = e.target,
                  menu = this.dropdownMenu,
                  btn = this.dropdownBtn;
            
            if (!(target === menu) && 
                !(target === btn) && 
                menu.classList.contains('active')) {
                this.toggleMenu();
            }
        });
    }

    render() {
        return (
            <Query query={LOAD_CURRENCIES}>
                {({loading, data}) => {
                    if (loading) {
                        return "Loading..";
                    }

                    const {currencies} = data;

                    return (
                        <div className="dropdown">
                            <button 
                                className="dropdown__logoContainer"
                                ref={this.getDropdownBtn}
                                onClick={this.onClickDropdownBtn}>
                                <div className="dropdown__logo">{this.props.activeCurrency}</div>
                                <div 
                                    className="dropdown__arrow"
                                    ref={this.getDropdownArrow} />
                            </button>
                            <ul 
                                className="dropdown__menu" 
                                ref={this.getDropdownMenu}>
                                {currencies.map(currency => {
                                    return (
                                        <li 
                                            key={currency.label}
                                            onClick={this.onChangeCurrency}
                                            data-label={currency.label}
                                            data-symbol={currency.symbol}>
                                            {currency.symbol} {currency.label}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                }}
            </Query> 
        );
    }
}

export default CurrencyDropdown;