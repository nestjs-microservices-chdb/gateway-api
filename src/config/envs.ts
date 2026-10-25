import 'dotenv/config';
import * as z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  PRODUCT_MICROSERVICE_HOST: z.string(),
  PRODUCT_MICROSERVICE_PORT: z.coerce.number()
});

const validSchema = envSchema.safeParse(process.env);

if (!validSchema.success) {
  console.error('Invalid environment variables: ', validSchema.error.issues);
  throw new Error('Invalid environment variables');
}

export const envs = {
  port: validSchema.data.PORT,
  productMicroserviceHost: validSchema.data.PRODUCT_MICROSERVICE_HOST,
  productMicroservicePort: validSchema.data.PRODUCT_MICROSERVICE_PORT
}