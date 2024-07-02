import React, { useEffect, useState } from "react";

function Countries({ query }) {
  const [data, setData] = useState(null);

  useEffect(
    function () {

      if (query) {
        // Create a variable url + query
        let url ="https://restfulcountries.com/api/v1/countries/${query}";

        fetch(url)
          .then(function (response) {
            if (!response.ok) {
              if (response.status === 404) {
                throw new Error('Data not found');
              } else if (response.status === 500) {
                throw new Error('Server error');
              } else {
                throw new Error('Network response was not ok');
              }
            }
            return response.json();
          })
          .then(function(data){
            setData(data);
          })
          .catch(console.error);
      }
    },
    [query]
  );

  if (!data) return null;

  return (
    <div>
      <h2>Countries : {data.name}</h2>
    </div>
  );
}

export default Countries;
