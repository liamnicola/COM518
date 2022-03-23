app.get('/songs', (req, res) => {
    con.query('SELECT * FROM students', (error,results,fields) => {
        if(error) {
            res.status(500).json({error: error});
        } else {
            res.json(results);
        }
    });
});