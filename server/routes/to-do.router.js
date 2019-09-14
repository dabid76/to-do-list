const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "to-do-list";`;
  console.log('in /toDoTask GET');
  pool.query(queryText).then(result =>{
    res.send(result.rows);
  }).catch(error =>{
    console.log('there was an error getting to do list', error);
    res.sendStatus(500);
  })
})
// POST
router.post('/', (req, res) => {
    console.log(req.body);
    let toAdd = req.body;
    //sanitize the db insert
    let queryText = `
    INSERT INTO "to-do-list" ("task", "complete")
    VALUES ($1, $2);
    `;
    pool.query(queryText, [toAdd.task, toAdd.complete])
        .then((result) => {
            console.log(result)
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });

});
// PUT

// DELTE

module.exports = router