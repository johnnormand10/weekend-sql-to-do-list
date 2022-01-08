const express = require("express");
const todoRouter = express.Router();
const pool = require("../public/module/pool");

//GET
todoRouter.get("/", (req, res) => {
    //query text to 'GET' task
    let queryText = 'SELECT * FROM "to-do"';

    pool.query(queryText)
        .then((dbRes) => {
            //sending table data to client
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('GET /task failed', err);
            //send 500 error
            res.sendStatus(500);
        });
});

//POST
todoRouter.post("/", (req, res) => {
    //query text to put new row in table
    let queryText = `
        INSERT INTO "to-do"
            ("task", "notes", "complete")
        VALUES 
            ($1, $2, $3)
    `;

    //NO HAX 
    let queryParams = [
        req.body.task,
        req.body.notes,
        req.body.complete,
    ];

    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST failed', err);
            res.sendStatus(500);
        });
});


//PUT
todoRouter.put('/:id', (req, res) => {
    //testing what 'id' and 'complete' is
    console.log('id is', req.params.id);
    console.log('complete is', req.body.complete);

    //query text to change complete 
    let queryText = `
        UPDATE "to-do" SET "complete" = $1 WHERE "id" = $2
    `;
    
    //NO HAX
    let queryParams = [
        req.body.complete,
        req.params.id
    ];
    //testing queryText and queryParams
    console.log(queryText);
    console.log(queryParams);

    pool.query(queryText, queryParams)
        .then((dbRes) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('PUT /task failed', err);
            res.sendStatus(500);
        });
});


//DELETE
todoRouter.delete("/:taskId", (req, res) => {
    //check url params
    console.log('taskId is', req.params.taskId);
    
    //query text to delete from table
    let queryText =`
        DELETE FROM "to-do"
        WHERE "id" = $1
    `;

    //NO HAX
    let queryParams = [req.params.taskId];

    pool.query(queryText, queryParams)
        .then((dbRes) => {
            console.log('DELETE /task success');
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('DELETE /task failure');
            res.sendStatus(500);
        });
});

module.exports = todoRouter;