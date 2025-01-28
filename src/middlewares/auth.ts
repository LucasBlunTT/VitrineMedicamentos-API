import { Request, Response, NextFunction } from "express";

const rotaAutenticada = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.password === '123') {    
    next();
    return;
  }
  return res.status(401).json({ message: 'Não autorizado' });
};

export default rotaAutenticada;