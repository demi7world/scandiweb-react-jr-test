import {gql} from '@apollo/client';

export const LOAD_CATEGORIES = gql`
    query {
        categories {
        name
        }
    }
`;


export const LOAD_PRODUCTS_BY_CATEGORY = gql`
    query GetProducts($title: String!) {
        category(input: {
        title: $title
        }) {
        name
        products {
            id,
            name,
            inStock,
            gallery,
            description,
            category,
            prices {
            currency {
                label,
                symbol
            },
            amount
            },
            brand
        }
        }
    }
`;

export const LOAD_CURRENCIES = gql`
    query {
        currencies {
        label,
        symbol
        }
    }
`;
