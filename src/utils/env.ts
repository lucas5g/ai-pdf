import 'dotenv/config.js'
import { z } from "zod";

export const env = z.object({
  OPENAI_API_KEY: z.string()
}).parse(process.env)