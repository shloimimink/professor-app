const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'universerties_api',
    password: 'password',
    port: '5432'
});


const getAllProfessors = (req, res) => {
    pool.query('SELECT * FROM professors ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
};




module.exports = {getAllProfessors};
