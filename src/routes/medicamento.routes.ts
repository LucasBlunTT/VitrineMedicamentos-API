import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import Medicamento from '../entities/Medicamento';
import rotaAutenticada from '../middlewares/auth';

const medicamentoRoutes = Router();

medicamentoRoutes.get('/', rotaAutenticada, async (req, res) => {
  try {
    const medicamentos = await AppDataSource.getRepository(Medicamento).find();
    res.status(200).json(medicamentos);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar medicamentos', error: error.message });
  }
});

medicamentoRoutes.get('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const medicamento = await AppDataSource.getRepository(Medicamento).findOne({
      where: { id },
    });

    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }

    res.status(200).json(medicamento);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar medicamento', error: error.message });
  }
});

medicamentoRoutes.post('/', rotaAutenticada, async (req, res) => {
  try {
    const { nome, descricao, quantidade } = req.body;

    if (!nome || !quantidade) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    const medicamento = new Medicamento();
    medicamento.nome = nome;
    medicamento.descricao = descricao || null;
    medicamento.quantidade = quantidade;

    const savedMedicamento = await AppDataSource.getRepository(
      Medicamento
    ).save(medicamento);
    res.status(201).json(savedMedicamento);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao criar medicamento', error: error.message });
  }
});

medicamentoRoutes.put('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { nome, descricao, quantidade } = req.body;

    const medicamentoRepository = AppDataSource.getRepository(Medicamento);
    const medicamento = await medicamentoRepository.findOne({ where: { id } });

    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }

    medicamento.nome = nome || medicamento.nome;
    medicamento.descricao = descricao || medicamento.descricao;
    medicamento.quantidade = quantidade || medicamento.quantidade;

    const updatedMedicamento = await medicamentoRepository.save(medicamento);
    res.status(200).json(updatedMedicamento);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao atualizar medicamento', error: error.message });
  }
});

medicamentoRoutes.delete('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleteResult = await AppDataSource.getRepository(Medicamento).delete(
      id
    );

    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: 'Medicamento não encontrado' });
    }

    res.status(200).json({ message: 'Medicamento excluído com sucesso' });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao excluir medicamento', error: error.message });
  }
});

export default medicamentoRoutes;
