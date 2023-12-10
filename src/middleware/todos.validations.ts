import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const TodoSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(2, { message: 'Title must be 2 or more characters long' }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(2, { message: 'Description must be 2 or more characters long' }),
});

export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = TodoSchema.safeParse(req.body);

  if (validationResult.success) {
    next();
  } else {
    const result = validationResult.error.issues.map(({ message, path }) => ({
      [path[0]]: message,
    }));

    const response = Object.assign({}, ...Object.values(result));
    res.status(400).json(response);
  }
};
