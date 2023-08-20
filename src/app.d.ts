import type { AccountPublic } from "$lib/schema"
import type { KVNamespace } from "@miniflare/kv"
import type { R2Bucket } from "@miniflare/r2"
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account?: null | AccountPublic
		}
		interface PageData {
			account?: null | AccountPublic
		}
		interface Platform {
			KV: KVNamespace
			R2: R2Bucket
		}
	}
}

export { };
