import express from "express";

const router = express.Router();

router.get('/', (_req, res) => {
    try {
        res.json({
            message: 'Welcome to Campus API',
            author: 'Agustin Alonso Cantoli',
        });

    } catch(error) {
        res.json({
            messages: 'Error en el Servidor',
            error: error
        });
    }
})

export default router;