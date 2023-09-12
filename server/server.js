// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { Parser } = require("node-sql-parser"); // Use node-sql-parser package
const cors = require("cors");
const sqlite3 = require("sqlite3");
const sqlParser = new Parser()

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the SQLite database
const db = new sqlite3.Database("database.sqlite");

// Define a route to handle SQL modification
app.post("/api/modify-sql", async (req, res) => {
  const { sqlQuery } = req.body;

  // Parse SQL to AST using node-sql-parser
  const ast = sqlParser.astify(sqlQuery);

  // Modify AST by hashing column names
  const columnMap = {};

  function modifyAst(node) {
    if (node.type === "column_ref") {
      const originalName = node.column;
      const hashedName = hashColumnName(originalName); // Replace with your hash function
      node.column = hashedName;
      columnMap[originalName] = hashedName;
    }

    if (node.expr) {
      modifyAst(node.expr);
    }


    if (node.left) {
      modifyAst(node.left);
    }

    if (node.right) {
      modifyAst(node.right);
    }
  }

  function hashColumnName(columnName) {
    // Replace this with your hash function (e.g., md5, sha256)
    // For simplicity, we'll use a basic hash here.
    return columnName + "_hashed";
  }

  modifyAst(ast);

  // Rebuild SQL from modified AST using node-sql-parser
  const modifiedSql = sqlParser.sqlify(ast);

  // Send the modified SQL and column map back to the frontend
  res.json({ modifiedSql, columnMap });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
