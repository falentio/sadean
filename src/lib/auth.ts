import { JWT_SECRET } from "$env/static/private";
import { EncryptJWT, jwtDecrypt, type JWTPayload } from "jose"
import { hkdf } from "@panva/hkdf"

let key: Promise<Uint8Array>
function getKey() {
    return key ??= hkdf(
        "sha256",
        "this ultra secret string for jwt encryption, jk",
        JWT_SECRET,
        "",
        16,
    )
}

export async function createToken<T extends JWTPayload>(data: T) {
    const key = await getKey();
    return new EncryptJWT(data)
        .setProtectedHeader({ alg: "dir", enc: "A128GCM" })
        .setIssuer("falentio:sadean")
        .setExpirationTime("7d")
        .encrypt(key);
}
export async function verifyToken<T extends JWTPayload>(token: string): Promise<T> {
    const key = await getKey();
    const { payload } = await jwtDecrypt(token, key, {
        issuer: "falentio:sadean",
    });
    return (payload as T);
}

function toHex(h: Uint8Array) {
    return Array.from(h).map(i => i.toString(16)).join("")
}

// it weak hashing algorithm, but I think cloudflare KV is safe enough to store this
export async function hash(password: string, secret: string) {
    const key = await getKey()
    const h = await hkdf("sha256", password, key, secret, 32)
    return toHex(h)
}

export async function verify(password: string, secret: string, h: string) {
    const v = await hash(password, secret);
    return v === h;
}