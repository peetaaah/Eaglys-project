import React, { useState } from "react";

function QueryForm() {
  const [sqlQuery, setSqlQuery] = useState("");
  const [modifiedSql, setModifiedSql] = useState("");
  const [columnMap, setColumnMap] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/modify-sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sqlQuery }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setModifiedSql(data.modifiedSql);
        setColumnMap(data.columnMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-12 auto re">
          <textarea
            placeholder="Enter your SQL query here..."
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            className="w-full h-32"
          />
        </div>
        <button className="mt-6 mb-6 bg-blue-600 hover:bg-blu" type="submit">
          Submit
        </button>
      </form>
      {modifiedSql ? (
        <div>
          <div>
            <h2>Modified SQL:</h2>
            <p>{modifiedSql}</p>
          </div>
          <div>
            <h2>Column Map:</h2>
            <pre>{JSON.stringify(columnMap, null, 2)}</pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QueryForm;
