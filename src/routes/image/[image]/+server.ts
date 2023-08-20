import { error, type RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ platform, params }) => {
    const id = params.image!
    const image = await platform?.R2!.get(id)
    if (!image) {
        throw error(404, "image not found")
    }
    const arrayBuffer = await image.arrayBuffer()
    return new Response(arrayBuffer, {
        headers: {
            ...(image.httpMetadata as Record<string, string>),
            ...image.customMetadata,
            "content-length": image.size.toString(),
            "cache-control": "public, max-age-31536000, immutable",
            "etag": image.httpEtag,
        }
    })
}