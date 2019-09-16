const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "to-do-list" ORDER BY "id";`;
  console.log('in /toDoTask GET');
  pool.query(queryText).then(result =>{
    res.send(result.rows);
  }).catch(error =>{
    console.log('there was an error getting to do list', error);
    res.sendStatus(500);
  })
}) // end GET

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

}); // end POST

// PUT
router.put('/complete/:id', ( req, res) => {
    let task = req.body;
    let id = req.params.id;

    console.log(`updating with ${id}`, task);
    let queryText = `UPDATE "to-do-list" SET "complete" = 'complete' WHERE "id" = $1;` ;
    pool.query(queryText, [id])
    .then(result => {
        console.log(result)
        res.sendStatus(200)
    })
    .catch(err => {
        console.log("error on put", err)
        res.sendStatus(500)
    })
}) // end PUT

// DELTE
router.delete( '/delete/:id', (req, res) => {
    let id = req.params.id;
    console.log('Delete route', id);
    let queryText = `DELETE FROM "to-do-list" WHERE "id" = $1;` ;
    pool.query(queryText, [id]).then((result) => {
        console.log(result)
        res.sendStatus(200)
    })
    .catch((error) => {
        console.log("error on router.delete", error)
        res.sendStatus(500);
    })
}) // end DELETE
module.exports = router