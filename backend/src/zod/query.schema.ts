import z from "zod";

export const querySchema = z.object({
  search: z.string().trim().min(1, "search is required").optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce
    .number()
    .int()
    .positive("pageSize can't be negative")
    .min(10)
    .max(50)
    .default(10),
  category: z
    .enum(["food", "transport", "shopping", "bills", "entertainment", "others"])
    .optional(),
});

export type querySchemaType = z.infer<typeof querySchema>;
