import { hash } from "$lib/auth";
import { KVNamespace } from "@miniflare/kv";
import { MemoryStorage } from "@miniflare/storage-memory"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { _loginHandler } from "./+page.server";

describe("login", () => {
    const storage = new MemoryStorage()
    const kv = new KVNamespace(storage)
    const getFn = vi.spyOn(kv, "get")

    afterAll(() => {
        vi.resetAllMocks()
    })

    it("should able to login", () => {
        getFn.mockImplementationOnce(async () => {
            return {
                name: "testing",
                password: await hash("123123123", "testing"),
            } as any
        })
        const result = _loginHandler(kv, {
            name: "testing",
            password: "123123123",
        })
        expect(result).resolves.toEqual({
            token: expect.any(String)
        })
        expect(getFn).toBeCalledTimes(1)
    })
})