import { gql } from "apollo-boost";
export const GET_COUNTRIES =
gql`
query getCountries{
  countries{
    code
    name
    emoji
    capital
    currency
    languages{
      name
    }
    continent{
      name
    }
  }
}
`
export const FILTER_TYPE = {
  NONE: 'NONE',
  CONTINENT: 'CONTINENT',
  LANGUAGE: 'LANGUAGE'
};