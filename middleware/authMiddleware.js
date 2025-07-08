import jwt from 'jsonwebtoken';  

const SECRET_KEY = process.env.SECRET_KEY || 'tu_clave_secreta'; 

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); 

    if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token extraído:', token); 

    jwt.verify(token, SECRET_KEY, (err, decoded) => { 
        if (err) {
            console.log('Error al verificar el token:', err); 
            return res.status(403).json({ error: 'Token inválido' });
        }

        req.user = {
            _id: decoded.id, 
            email: decoded.email
        };
        next();
    });
};
