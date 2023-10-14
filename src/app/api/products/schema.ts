import { z } from 'zod';

const schema = z.object({
    name: z.string().min(3).max(100),
    brand: z.string().min(3).max(100),
    numbers: z.number()
});

export default schema;
