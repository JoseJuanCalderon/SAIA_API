const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { correo, contrasena, idArea, idRol } = req.body;
    const query = 'INSERT INTO Usuarios (correo, contrasena, idArea, idRol) VALUES (?, ?, ?, ?)';
    db.query(query, [correo, contrasena, idArea, idRol], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario creado', id: result.insertId });
    });
});

// Actualizar un usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { correo, contrasena, idArea, idRol } = req.body;
    const query = 'UPDATE Usuarios SET correo = ?, contrasena = ?, idArea = ?, idRol = ? WHERE idUsuario = ?';
    db.query(query, [correo, contrasena, idArea, idRol, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario actualizado' });
    });
});

// Eliminar un usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuarios WHERE idUsuario = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario eliminado' });
    });
});

module.exports = router;
