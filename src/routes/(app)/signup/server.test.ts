import { KVNamespace } from "@miniflare/kv";
import { MemoryStorage } from "@miniflare/storage-memory"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { _signupHandler } from "./+page.server";

describe("signup", () => {
    const storage = new MemoryStorage()
    const kv = new KVNamespace(storage)
    const putFn = vi.spyOn(kv, "put")

    afterAll(() => {
        vi.resetAllMocks()
    })

    it("should able to signup", async () => {
        putFn.mockImplementationOnce(async () => { })
        const result = _signupHandler(kv, {
            name: "123123123",
            password: "123123123",
            confirmation: "123123123",
        })
        await expect(result).resolves.toEqual({
            account: {
                name: expect.any(String),
            },
            token: expect.any(String)
        })
        expect(putFn).toBeCalledTimes(1)
    })
})