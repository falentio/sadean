import { dev } from "$app/environment"
import { verifyToken } from "$lib/auth"
import { account, known, type AccountPublic, accountPublic } from "$lib/schema"
import { redirect, type Handle } from "@sveltejs/kit"

if (dev) {
    const { Blob } = await import("fetch-blob")
    Object.assign(globalThis, { Blob })
}

export const handle: Handle = async ({ event, resolve }) => {
    if (dev) {
        const { FileStorage } = await import("@miniflare/storage-file")
        const { KVNamespace } = await import("@miniflare/kv")
        const { R2Bucket } = await import("@miniflare/r2")
        const storage = new FileStorage("./data")
        const KV = new KVNamespace(storage)
        const R2 = new R2Bucket(storage)
        Object.assign((event.platform as object) ??= {}, { KV, R2 })
    } else {
        Object.assign((event.platform as object), (event.platform as any).env)
    }
    const token = event.cookies.get("jwt")
    if (token) {
        event.locals.account = await verifyToken<AccountPublic>(token)
            .then(a => known(accountPublic, a))
            .catch(e => {
                event.cookies.delete("jwt")
                return null
            })
    }
    if (event.locals.account && ["/login", "/signup"].includes(event.url.pathname)) {
        const to = event.url.searchParams.get("to") || "/" + event.locals.account.name
        throw redirect(302, to)
    }
    return resolve(event)
}