import type { KVNamespace } from "@miniflare/kv";
import type { Output } from "valibot";
import { login } from "./schema";
import { createToken, verify } from "$lib/auth";
import { known, type Account, accountPublic } from "$lib/schema";
import { error, type Action, type Actions } from "@sveltejs/kit";
import { getRequestData, wrapAction } from "$lib/helpers";
import { dev } from "$app/environment";


export async function _loginHandler(kv: KVNamespace, data: Output<typeof login>) {
    const acc = await kv.get<Account>(`account:${data.name.toLowerCase()}`, { type: "json" })
    if (!acc) {
        throw error(404, "account not found")
    }
    const eq = await verify(data.password, data.name, acc.password)
    if (!eq) {
        throw error(403, "password not match")
    }
    const p = known(accountPublic, acc)
    return {
        token: await createToken(p)
    }
}

export const actions: Actions = {
    default: wrapAction(async ({ request, platform, cookies }) => {
        const data = await getRequestData(request, login)
        const result = await _loginHandler(platform!.KV, data)
        cookies.set("jwt", result.token, {
            httpOnly: true,
            path: "/",
            secure: !dev,
        })
        return result
    })
}