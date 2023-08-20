import { known, type AccountPublic, type Product, accountPublic } from "$lib/schema"
import { error } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ platform, params }) => {
    return {
        products: platform!.KV
            .get<Product[]>(`product:${params.merchantId}`, "json")
            .then(p => p || []),
        owner: platform!.KV
            .get<AccountPublic>(`account:${params.merchantId}`, "json")
            .then(d => d ? known(accountPublic, d) : null)
            .catch(e => { throw error(404) }),
    }
}