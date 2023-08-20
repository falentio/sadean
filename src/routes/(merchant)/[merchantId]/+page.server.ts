import { getRequestData, wrapAction } from '$lib/helpers.js';
import type { Product } from '$lib/schema/index.js';
import type { KVNamespace } from '@miniflare/kv';
import { object, string, type Output } from 'valibot';

export const _deleteSchema = object({
    image: string(),
    name: string(),
})
export const _deleteHandler = async (kv: KVNamespace, d: Output<typeof _deleteSchema>) => {
    const ps = await kv.get<Product[]>(`product:${d.name}`, "json")
    if (!ps) {
        return
    }
    const update = ps.filter(p => p.image !== d.image)
    await kv.put(`product:${d.name}`, JSON.stringify(update))
}

export const actions = {
    delete: wrapAction(async ({ request, platform }) => {
        const data = await getRequestData(request, _deleteSchema)
        return _deleteHandler(platform!.KV, data)
    })
}