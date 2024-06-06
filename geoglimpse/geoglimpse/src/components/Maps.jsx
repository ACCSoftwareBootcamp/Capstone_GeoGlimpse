import React, { useEffect, useState } from "react";

function Maps({ query }) {
  const [data, setData] = useState(null);

  useEffect(
    function () {
      if (query) {
        fetch("/api/data?query=" + query)
          .then(function (response) {
            return response.json();
          })
          .then(setData)
          .catch(console.error);
      }
    },
    [query]
  );

  if (!data) return null;

  return (
    <div>
      <h2>Maps</h2>
    </div>
  );
}

export default Maps;
