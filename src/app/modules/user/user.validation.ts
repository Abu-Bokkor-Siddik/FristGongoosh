import { z } from 'zod';

// validation object
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .max(20, { message: 'password can not be more then 20 letter' })
    .optional(),
});
export const UserValidationSchema = {
  userValidationSchema,
};
