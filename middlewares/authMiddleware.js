const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido. O caminho marcial está bloqueado.' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ erro: 'Formato de token inválido.' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'shenzhen_secret_key');
        req.usuarioId = decoded.id;
        req.usuarioRole = decoded.role;
        return next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token expirado ou inválido.' });
    }
};