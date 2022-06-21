import React, { useState } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { FaSearch } from 'react-icons/fa';
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
});

const App = () => {


  const  [selectedCountry, setSelectedCountry]  = useState("")


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
      </div>
    </ApolloProvider>
  )
};
export default App;
