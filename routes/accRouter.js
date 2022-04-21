const con = require('../public/services/db');
const express = require('express');
const accRouter = express.Router();



accRouter.get('/location/:location', (req, res) => {
    con.query('SELECT * FROM accommodation WHERE location=?',
        [req.params.location],
        (error, results, fields) => {
        if(error) {
            res.status(500).json({error: error});	
        }
        else {
            res.json(results);
        }
    });
});

accRouter.get('/location/:location/type/:type', (req, res) => {
    con.query('SELECT * FROM accommodation WHERE location=? AND type=?',
        [req.params.location, req.params.type],
        (error, results, fields) => {
        if(error) {
            res.status(500).json({error: error});	
        }
        else {
            res.json(results);
        }
    });
});



accRouter.post('/booking', (req, res) => {
    if(!req.body.accID && !req.body.npeople && !req.body.thedate) {
        res.status(400).json({error : "Please input all fields"})
    } else {
        con.query('INSERT INTO acc_bookings(accID, npeople, thedate) VALUES(?,?,?)',
        [req.body.accID, req.body.npeople, req.body.thedate],
        (error, results, fields) => {
            if(error) {
                res.status(500).json({error: error});
            }
            con.query('UPDATE acc_dates SET availability = availability - ? WHERE thedate=? and accID = ?',
            [req.body.npeople, req.body.thedate, req.body.accID],
            (error, results, fields) => {
                if(error) {
                    res.status(500).json({error: error});
                }
                res.status(200).json({results: "Success"});
            });
        });
        };
    });

accRouter.get('/availability/:accID/:thedate', (req, res) => {
    con.query('SELECT availability FROM acc_dates WHERE accID = ? AND thedate =?',
        [req.params.accID, req.params.thedate],
        (error, results, fields) => {
        if(error) {
            res.status(500).json({error: error});	
        }
        else {
            res.json(results);
        }
    });
});
    
module.exports = accRouter;