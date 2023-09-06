import { z } from "zod";

export const Schema = z.object({
  emails: z.string().nonempty("Entre ao menos um e-mail"),
  name: z.string().nonempty("Entre com o nome do arquivo"),
  description: z.string().nullable().default(null).optional(),
});

export type FilterForm = z.infer<typeof Schema>;
