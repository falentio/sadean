import { product } from "$lib/schema";
import { coerce, merge, number, object, instance } from "valibot";

export const productUpload = merge([
    product,
    object({
        image: instance(Blob),
        price: coerce(number(), v => Number(v))
    }),
])