import z from "zod";

export const idSchema = z.coerce
  .number()
  .int()
  .positive("id must be positive integer");

export type idSchemaType = z.infer<typeof idSchema>;
