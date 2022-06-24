import React, { useEffect, useState } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
// import { FaSearch } from 'react-icons/fa';
import _ from "lodash"
import { GET_COUNTRIES, FILTER_TYPE } from "./App.model";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
});

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentFilter, setFilter] = useState(FILTER_TYPE.CONTINENT);

  useEffect(() => { }, [currentFilter]);

  const { loading, error, data } = useQuery(GET_COUNTRIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  const groupedByContinent = _.groupBy(data.countries, ({ continent }) => continent.name);
  const groupedByLanguages = _.groupBy(data.countries, (country) => country.languages?.[0]?.name);
  const entriesByContinent = Object.entries(groupedByContinent);
  const entriesByLanguage = Object.entries(groupedByLanguages);
  const groupedData = {
    [FILTER_TYPE.NONE]: ["", data.countries],
    [FILTER_TYPE.CONTINENT]: entriesByContinent,
    [FILTER_TYPE.LANGUAGE]: entriesByLanguage,
  };
  console.log(groupedData)
  // console.log(groupedByLanguages)
  return (
    <ApolloProvider client={client}>
      <div className="animate__animated animate__fadeIn container mx-auto">
        <h2 className="text-center my-3">
          Country Search
        </h2>
        <input
          type="text"
          name="country"
          id="country"
          className="form-control rounded"
          value={selectedCountry}
          placeholder="Search for a country"
          onChange={
            (e) => setSelectedCountry(e.target.value)
          }
        />
        <div className="my-3">
          <button className={currentFilter === FILTER_TYPE.CONTINENT ? 'active btn btn-primary' : 'btn btn-secondary'} onClick={() => setFilter(FILTER_TYPE.CONTINENT)}>Group By Continent</button>
          <button className={currentFilter === FILTER_TYPE.LANGUAGE ? 'active btn btn-primary mx-3' : 'btn btn-secondary mx-3'} onClick={() => setFilter(FILTER_TYPE.LANGUAGE)}>Group By Language</button>
        </div>
        {
          groupedData[currentFilter].map((entry, i) => {
            if (selectedCountry === "") return <></>;
            try {
              const mappedCountries = entry[1].filter((country) => country.name.toLowerCase().includes(selectedCountry));
              if (mappedCountries?.length > 0) {
                return <><h1 className="animate__animated animate__fadeInRight">{entry[0]}</h1>
                  {mappedCountries.map((country) => {

                    return (

                      <div className="animate__animated animate__fadeInRight card my-3" key={country.code}>
                        <div className="card-body">
                          <h5 className="card-title"><span>{country.emoji} </span>{country.name}</h5>
                          <h6 className="card-subtitle mb-2 ">Capital: {country.capital}</h6>
                          <h6 className="card-subtitle mb-2 ">Currency: {country.currency}</h6>
                        </div>
                      </div>)

                  })}


                </>
              }
            } catch (error) {
              return <h1>Whoops! There has been an error!</h1>
            }
          })
        }
      </div>
    </ApolloProvider>
  )
};
export default App;
