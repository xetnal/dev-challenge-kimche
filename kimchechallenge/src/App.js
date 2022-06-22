import React, { useState } from "react";
import "./App.css";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { FaSearch } from 'react-icons/fa';
import { CountryList } from "./components/countryList";
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
});

const App = () => {

  const [selectedCountry, setSelectedCountry] = useState("")

  const GET_COUNTRIES =
    gql`
      query getCountries{
        countries{
          code
          name
          emoji
          capital
          currency
        }
      }
      `
      

  const { loading, error, data } = useQuery(GET_COUNTRIES)

  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;


  return (

    <ApolloProvider client={client}>

      <div className="container mx-auto">
        <h2 className="text-center my-3">
          Country Search
        </h2>
        <input
          type="text"
          name="country"
          id="country"
          className="form-control"
          value={selectedCountry}
          placeholder="Search for a country"
          onChange={
            (e) => setSelectedCountry(e.target.value)
          }
        />
        Countries:
        {data.countries.map((country) => {
          if (country.name.toLowerCase().includes(selectedCountry) ) {

            return <div className="card" key={country.code}>
            <div className="card-body">
              <h5 className="card-title"><span>{country.emoji} </span>{country.name}</h5>
              <h6 className="card-subtitle mb-2 ">Capital: {country.capital}</h6>
              <h6 className="card-subtitle mb-2 ">Currency: {country.currency}</h6>
              
              
              
            </div>
          </div>
          }else if (selectedCountry === "") return ""
        })}
      </div>
    </ApolloProvider>
  )
};
export default App;
