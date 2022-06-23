import React, { useState } from "react";
import "./App.css";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
// import { FaSearch } from 'react-icons/fa';

import _ from "lodash"
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
          languages{
            name
          }
          continent{
            name
          }
        }
      }
      `



  const { loading, error, data } = useQuery(GET_COUNTRIES)

  console.log(data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;


  const groupedByContinent = _.groupBy(data.countries, ({ continent }) => continent.name)
  // const continents = Object.keys(groupedByContinent)
  const groupedByLanguages = _.groupBy(data.countries, ({ languages }) => [languages.name])
  console.log(groupedByContinent)
  console.log(Object.values(groupedByContinent))
  console.log(Object.entries(groupedByContinent))
  console.log(groupedByContinent.Africa)

  // console.log(groupedByLanguages)
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
        {

        }
        {data.countries.map((country) => {
          if (selectedCountry === "") return
          else if (country.name.toLowerCase().includes(selectedCountry)) {

            return <><h1>{country.continent.name}</h1>
              <div className="card my-3" key={country.code}>
                <div className="card-body">
                  <h5 className="card-title"><span>{country.emoji} </span>{country.name}</h5>
                  <h6 className="card-subtitle mb-2 ">Capital: {country.capital}</h6>
                  <h6 className="card-subtitle mb-2 ">Currency: {country.currency}</h6>



                </div>
              </div>
            </>
          }
        })}
        {/* {Object.values(groupedByContinent).map((continents, i) => {
          console.log(continents)
          console.log(i)
          if (selectedCountry === "") return
          else if (.includes(selectedCountry))
            return <h2>{continents[0].continent.name}</h2>

        })} */}
      </div>
      {/* <div>{Object.keys(groupedByContinent).map((continent) => {console.log(typeof(continent))})}</div> */}
    </ApolloProvider>
  )
};
export default App;
