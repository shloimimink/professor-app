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

const addProfessor = (req, res) => {
    const {name, title, school, department, difficulty} = req.body;

    pool.query('INSERT INTO professors (name, title, school, department, difficulty)' +
        ' VALUES ($1, $2, $3, $4, $5) RETURNING id', [name, title, school, department, difficulty], (err, result) => {
        if (err) {
            throw err
        }
        console.log(result);
        res.status(201).send(result.body)
    })
};


module.exports = {getAllProfessors, addProfessor};
