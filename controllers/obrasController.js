const Obra = require('../models/Obra');

exports.listarObras = async (req, res) => {
    try {
        const obras = await Obra.findAll();
        res.json(obras);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criarObra = async (req, res) => {
    try {
        const { titulo, sinopse, autor_id } = req.body;
        const novaObra = await Obra.create({ titulo, sinopse, autor_id });
        res.status(201).json({
            message: 'Obra forjada com sucesso no acervo da Shenzhen Scrolls!', 
            obra: novaObra
        });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletarObra = async (req, res) => {
    try {
        const obraId = req.params.id;
        
        // Fase 3 (Básica): Por enquanto, qualquer um com token válido (que passou no middleware) pode deletar.
        // Na Fase 4 (OPA), a regra de negócio impedirá que um Autor delete a obra de outro.
        const deletados = await Obra.destroy({ where: { id: obraId } });

        if (deletados === 0) {
            return res.status(404).json({ erro: 'Obra não encontrada no acervo.' });
        }

        res.status(200).json({ message: 'A obra foi reduzida a cinzas com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};