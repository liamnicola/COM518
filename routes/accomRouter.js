const con = require('../public/services/db');
const express = require('express');
const router = express.Router();



router.get('/location/:location', (req, res) => {
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

router.get('/location/:location/type/:type', (req, res) => {
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

router.post('/booking/:accID/:npeople/:thedate', (req, res) => {
    if(!req.params.accID && !req.params.npeople && !req.params.thedate) {
        res.status(400).json({error : "Please input all fields"})
    } else {
        con.query('INSERT INTO acc_bookings(accID, npeople, thedate) VALUES(?,?,?)',
        [req.params.accID, req.params.npeople, req.params.thedate],
        (error, results, fields) => {
            if(error) {
                res.status(500).json({error: error});
            }
            con.query('UPDATE acc_dates SET availability = availability - ? WHERE thedate=? and accID = ?',
            [req.params.npeople, req.params.thedate, req.params.accID],
            (error, results, fields) => {
                if(error) {
                    res.status(500).json({error: error});
                }
                res.status(200).json({results: "Success"});
            });
        });
        };
    });
    
module.exports = router;