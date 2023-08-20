import { getRequestData, wrapAction } from '$lib/helpers.js';
import type { KVNamespace } from '@miniflare/kv';
import { updateSchema } from './schema.js';
import type { Output } from 'valibot';
import type { Account } from '$lib/schema/index.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ platform, locals }) => {
    const account = await platform!.KV.get<Account>(`account:${locals.account!.name}`, "json")
    return { account }
}

export async function _updateHandler(kv: KVNamespace, name: string, data: Output<typeof updateSchema>) {
    const account = await kv.get<Account>(`account:${name}`, "json")
    if (!account) {
        return
    }
    Object.assign(account, data)
    await kv.put(`account:${name}`, JSON.stringify(account))
    throw redirect(302, "/" + name)
}

export const actions = {
    default: wrapAction(async ({ request, platform, locals }) => {
        const data = await getRequestData(request, updateSchema)
        return _updateHandler(platform!.KV, locals.account!.name, data)
    })
}