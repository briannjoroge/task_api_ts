import { Request, Response, NextFunction } from "express";

const validateTaskInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { title, description } = req.body;

  if (title === "" || description === "") {
    res.status(500).json({ message: "Title and description field is neded." });
    return;
  }

  next();
};

export default validateTaskInput;
