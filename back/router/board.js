import express from 'express';
import isValidBoardData from '../validation/board.js';
import board from '../service/board.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const { id } = req.user;
  const result = await board.getInitData(req.db.models, id);
  res.status(200).json(result);
});

router.post('/', async (req, res, next) => {
  if (isValidBoardData(req.body)) {
    const result = await board.createBoard(req.db.models, req.body);
    res.status(200).json(result);
  }
  next();
});

router.patch('/title', async (req, res, next) => {
  const result = await board.modifyTitle(req.db.models, req.body);
  res.status(200).json(result);
});

router.patch('/background', async (req, res, next) => {
  const result = await board.modifyBG(req.db.models, req.body);
  res.status(200).json(result);
});

export default router;
