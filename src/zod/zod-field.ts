import * as z from 'zod';

export function zodFieldExample() {
  const test = z.string().url('Url is not valid');

  console.log(zodValidate(test, 'http://google.nl'));
  console.log(zodValidate(test, 'http://google.nl'));
  console.log(zodValidate(test, 'google.nl'));
  console.log(zodValidate(test, 'google'));
  console.log(zodValidate(test, undefined));
}

export function zodMultipleRefine() {
  const test = z
    .string()
    .optional()
    .refine(value => value !== 'test', 'Testing')
    .refine(value => value !== 'testing', 'Testing 2')
    .superRefine((value, ctx) => {
      if (value === 'appel') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'No appel'
        });
      }

      return z.NEVER;
    });

  console.log(zodValidate(test, 'http://google.nl'));
  console.log(zodValidate(test, 'test'));
  console.log(zodValidate(test, 'testing'));
  console.log(zodValidate(test, 'appel'));
  console.log(zodValidate(test, undefined));
}

function zodValidate<S extends z.ZodSchema, V>(schema: S, value?: V) {
  const { success, error } = schema.safeParse(value);
  return success ? true : error.message;
}
