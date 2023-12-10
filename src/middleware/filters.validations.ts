import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const FilterSchema = z.object({
  search: z
    .string({
      invalid_type_error: 'search must be a string',
    })
    .optional(),
  orderby: z
    .string()
    .refine(
      (value) => {
        const validValues = ['title', 'description', 'created_at'];
        if (value) {
          return validValues.includes(value.toLowerCase());
        }
      },
      {
        message:
          'Invalid order. Must be `title`, `description` or `created_at` in any case.',
      }
    )
    .optional(),
  descending_order: z
    .string()
    .refine(
      (value) => {
        const validValues = ['ASC', 'asc', 'DESC', 'desc'];
        if (value) {
          return validValues.includes(value.toLowerCase());
        }
      },
      {
        message:
          "Invalid order direction. Must be 'ASC' or 'DESC' in any case.",
      }
    )
    .optional(),
});

export const validateFilters = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = FilterSchema.safeParse(req.query);

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
