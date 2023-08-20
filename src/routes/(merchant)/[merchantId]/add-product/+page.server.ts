import { getRequestData, wrapAction } from "$lib/helpers";
import type { KVNamespace } from "@miniflare/kv";
import { productUpload } from "./schema.js";
import type { Output } from "valibot";
import type { R2Bucket } from "@miniflare/r2";
import type { Product } from "$lib/schema/index.js";
import type { PageServerLoad } from "./$types.js";
import { redirect } from "@sveltejs/kit";
export async function _addProduct(kv: KVNamespace, r2: R2Bucket, product: Output<typeof productUpload>, accountId: string) {
    const image = crypto.randomUUID()
        + "."
        + product.image.name.split(".").at(-1)
    const content = await product.image.arrayBuffer()
    await r2.put(image, content, {
        customMetadata: {
            "content-type": product.image.type
        },
    })
    const p = {
        ...product,
        image,
    }
    const ps = await kv
        .get<Product[]>(`product:${accountId}`, "json")
        .then(ps => ps || [])
    await kv.put(`product:${accountId}`, JSON.stringify([...ps, p]))
    throw redirect(302, ".")
}

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.account) {
        throw redirect(302, "/login")
    }
    return {}
}

export const actions = {
    default: wrapAction(async ({ request, platform, locals }) => {
        const product = await getRequestData(request, productUpload)
        return _addProduct(platform!.KV, platform!.R2, product, locals.account!.name)
    })
}