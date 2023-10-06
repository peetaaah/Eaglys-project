// server.js
const express = require("express");
const bodyParser = require("body-parser");
const { Parser } = require("node-sql-parser"); // Use node-sql-parser package
const cors = require("cors");
const sqlite3 = require("sqlite3");
const sqlParser = new Parser();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a connection to the SQLite database, if we need it.
// const db = new sqlite3.Database("TEST.db");

// Define a route to handle SQL modification
app.post("/api/modify-sql", async (req, res) => {
  const { sqlQuery } = req.body;

  // Parse SQL to AST using node-sql-parser
  const ast = sqlParser.astify(sqlQuery);
  console.log("this is ast", ast);

  // Modify AST by hashing column names
  const columnMap = {};

  function modifyAst(node) {

    if (node.type === "column_ref") {
      const originalName = node.column; 
      const hashedName = hashColumnName(originalName); 
      node.column = hashedName; 
      node.as = hashedName; 
      columnMap[originalName] = hashedName; 
    } else if (node.columns) {
      // Check if the node has a "columns" property
      node.columns.forEach((column) => {
        if (column.expr && column.expr.type === "column_ref") {
          const originalName = column.expr.column; 
          console.log("this is originalName", originalName);
          const hashedName = hashColumnName(originalName); 
          column.expr.column = hashedName; 
          column.expr.as = hashedName; 
          columnMap[originalName] = hashedName; 
        }
      });
    } else {
      console.log("not a node");
    }

    if (node.expr) {
      modifyAst(node.expr); 
    }

    if (node.left) {
      modifyAst(node.left); // Recursively process the left child node
    }

    if (node.right) {
      modifyAst(node.right); // Recursively process the right child node
    }
  }

  function hashColumnName(columnName) {
    console.log("this is column name", columnName);
    return columnName + "_hashed";
  }


  modifyAst(ast);


  // Rebuild SQL from modified AST using node-sql-parser
  const modifiedSql = sqlParser.sqlify(ast);


  // db.all(modifiedSql, [], (err, rows) => {
  //   if (err) {
  //     throw err;
  //   }
  // });

  // Send the modified SQL and column map back to the frontend
  res.json({ modifiedSql, columnMap });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
