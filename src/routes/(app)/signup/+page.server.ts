import { getRequestData, wrapAction } from "$lib/helpers";
import { error, type Actions } from "@sveltejs/kit";
import { signup } from "./schema";
import type { KVNamespace } from "@miniflare/kv";
import type { Output } from "valibot";
import { account, accountPublic, known } from "$lib/schema";
import { createToken, hash } from "$lib/auth";
import { dev } from "$app/environment";
import type { R2Bucket } from "@miniflare/r2";

export async function _signupHandler(kv: KVNamespace, r2: R2Bucket, data: Output<typeof signup>) {
    const image = crypto.randomUUID()
        + "."
        + data.image.name.split(".").at(-1)
    const content = await data.image.arrayBuffer()
    await r2.put(image, content, {
        customMetadata: {
            "content-type": data.image.type
        },
    })
    const acc = known(account, {
        name: data.name.toLowerCase(),
        image,
        password: await hash(data.password, data.name)
    })
    if (await kv.get(`account:${acc.name}`) !== null) {
        throw error(409, "nama sudah digunakan")
    }
    await kv.put(`account:${acc.name}`, JSON.stringify(acc))
    return {
        account: known(accountPublic, acc),
        token: await createToken({ ...acc, password: null })
    }
}

export const actions: Actions = {
    default: wrapAction(async ({ request, platform, cookies }) => {
        const data = await getRequestData(request, signup)
        const res = await _signupHandler(platform!.KV, platform!.R2, data)
        cookies.set("jwt", res.token, {
            path: "/",
            httpOnly: true,
            secure: !dev,
        })
        return res
    })
}