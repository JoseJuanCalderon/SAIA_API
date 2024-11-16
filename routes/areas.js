const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todas las áreas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Areas';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Crear una nueva área
router.post('/', (req, res) => {
    const { clave, nombre } = req.body;
    const query = 'INSERT INTO Areas (clave, nombre) VALUES (?, ?)';
    db.query(query, [clave, nombre], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Area created', id: result.insertId });
    });
});

// Actualizar un área
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { clave, nombre } = req.body;
    const query = 'UPDATE Areas SET clave = ?, nombre = ? WHERE idArea = ?';
    db.query(query, [clave, nombre, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Area updated' });
    });
});

// Eliminar un área
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Areas WHERE idArea = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Area deleted' });
    });
});

module.exports = router;
