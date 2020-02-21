const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'universerties_api',
    password: 'password',
    port: '5432'
});

// INDEX PROFESSORS
const getAllProfessors = (req, res) => {
    pool.query('SELECT * FROM professors ORDER BY id ASC', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
};

// SHOW PROFESSOR
const getProfessorById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM professors WHERE id = $1', [id], (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
};

// CREATE PROFESSOR
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

// UPDATE PROFESSOR
const updateProfessorById = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, title, school, department, difficulty} = req.body;

    pool.query('UPDATE professors SET name = $1, title = $2, school = $3, department = $4, difficulty = $5 WHERE id = $6' +
        ' RETURNING id', [name, title, school, department, difficulty, id], (err, result) => {
        if (err) {
            throw err
        }
        res.status(200).json(result.rows[0])
    })
};

// DELETE PROFESSOR
const deleteProfessorById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('DELETE FROM professors WHERE id = $1', [id], (err) => {
        if (err) {
            throw err
        }
        res.status(200).json(`User deleted with ID: ${id}`)
    })
};

module.exports = {
    getAllProfessors,
    addProfessor,
    getProfessorById,
    updateProfessorById,
    deleteProfessorById
};
