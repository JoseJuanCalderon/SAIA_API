const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todos los tipos de documentos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM TiposDocs';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Crear un nuevo tipo de documento
router.post('/', (req, res) => {
    const { clave, descripcion } = req.body;
    const query = 'INSERT INTO TiposDocs (clave, descripcion) VALUES (?, ?)';
    db.query(query, [clave, descripcion], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Tipo de documento creado', id: result.insertId });
    });
});

// Actualizar un tipo de documento
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { clave, descripcion } = req.body;
    const query = 'UPDATE TiposDocs SET clave = ?, descripcion = ? WHERE idTipo = ?';
    db.query(query, [clave, descripcion, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tipo de documento actualizado' });
    });
});

// Eliminar un tipo de documento
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM TiposDocs WHERE idTipo = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tipo de documento eliminado' });
    });
});

module.exports = router;
