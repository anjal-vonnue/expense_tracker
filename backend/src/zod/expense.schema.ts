import z from "zod";

const expenseBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "title is required")
    .max(200, "title must be at most 200 chars"),
  amount: z.coerce.number().positive("amount muse be greater than 0"),
  category: z.enum([
    "food",
    "transport",
    "shopping",
    "bills",
    "entertainment",
    "others",
  ]),
  notes: z.string().nullable().optional(),
  expenseDate: z.iso.date().optional(),
});

export const expenseSchema = expenseBaseSchema.extend({
  category: z
    .enum(["food", "transport", "shopping", "bills", "entertainment", "others"])
    .default("others"),
});

export const updateExpenseSchema = expenseBaseSchema.partial();
export type expenseSchemaInput = z.infer<typeof expenseSchema>;
export type updateSchemaInput = z.infer<typeof updateExpenseSchema>;
