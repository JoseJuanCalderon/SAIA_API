const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todos los roles
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Roles';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Crear un nuevo rol
router.post('/', (req, res) => {
    const { rol } = req.body;
    const query = 'INSERT INTO Roles (rol) VALUES (?)';
    db.query(query, [rol], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Role created', id: result.insertId });
    });
});

// Actualizar un rol
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;
    const query = 'UPDATE Roles SET rol = ? WHERE idRol = ?';
    db.query(query, [rol, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Role updated' });
    });
});

// Eliminar un rol
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Roles WHERE idRol = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Role deleted' });
    });
});

module.exports = router;
