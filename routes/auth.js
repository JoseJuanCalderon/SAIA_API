const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;
    const query = `SELECT * FROM Usuarios WHERE correo = ? AND contrasena = ?`;
    
    db.query(query, [correo, contrasena], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            res.json({ message: 'Login successful', user: results[0] });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });
});

module.exports = router;
