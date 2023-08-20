import { array, maxLength, minLength, minValue, number, object, regex, string, transform, type ObjectSchema, type Output, omit, parse, nullable, optional } from "valibot";

export const product = object({
    name: string("nama wajib di isi"),
    price: number("harga wajib di isi", [minValue(1, "harga tidak boleh negatif")]),
    image: string(),
    description: optional(string()),
})
export type Product = Output<typeof product>

export const account = object({
    name: string("Wajib Di Isi", [
        regex(/^[a-z0-9_.]+$/i, "nama hanya boleh huruf, angka, garis bawah dan titik"),
        maxLength(32, "panjang nama tidak boleh lebih dari 32"),
    ]),
    image: optional(string()),
    facebook: optional(string()),
    twitter: optional(string()),
    instagram: optional(string()),
    whatsapp: optional(string()),
    password: string("Wajib di isi", [minLength(8, "password harus setidaknya 8 karakter")]),
})

export type Account = Output<typeof account>
export const accountPublic = omit(account, ["password"])
export type AccountPublic = Output<typeof accountPublic>

export function known<T extends ObjectSchema<any>>(s: T, v: unknown): Output<T> {
    const schema = transform(s, v => {
        const keys = Object.keys(s.object)
        const entries = keys.map(k => [k, v[k]])
        const obj = Object.fromEntries(entries)
        return obj
    })
    return parse(schema, v)
}