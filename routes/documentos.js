const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todos los documentos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Documentos';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Crear un nuevo documento
router.post('/', (req, res) => {
    const { clave, nombre, idTipo, idArea, archivo } = req.body;
    const query = 'INSERT INTO Documentos (clave, nombre, idTipo, idArea, archivo) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [clave, nombre, idTipo, idArea, archivo], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Documento creado', id: result.insertId });
    });
});

// Actualizar un documento
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { clave, nombre, idTipo, idArea, archivo } = req.body;
    const query = 'UPDATE Documentos SET clave = ?, nombre = ?, idTipo = ?, idArea = ?, archivo = ? WHERE idDocumento = ?';
    db.query(query, [clave, nombre, idTipo, idArea, archivo, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Documento actualizado' });
    });
});

// Eliminar un documento
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Documentos WHERE idDocumento = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Documento eliminado' });
    });
});

module.exports = router;
