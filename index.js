const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const rolesRoutes = require('./routes/roles');
const areasRoutes = require('./routes/areas');
const tiposDocsRoutes = require('./routes/tiposDocs');
const usuariosRoutes = require('./routes/usuarios');
const documentosRoutes = require('./routes/documentos');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use('/roles', rolesRoutes);
app.use('/areas', areasRoutes);
app.use('/tiposDocs', tiposDocsRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/documentos', documentosRoutes);
app.use('/auth', authRoutes);

app.post('/auth/login', (req, res) => {
    // Aquí va tu lógica de autenticación
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
