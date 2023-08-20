<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import { form } from "$lib/components/Form.svelte";
	import Marque from "$lib/components/Marque.svelte";
	import type { Product } from "$lib/schema";
	import Bg from "./BG.svelte";
	export let product: Product;
	$: owned = $page.data.account?.name === $page.data.owner.name;
</script>

<Bg class="border-2 shadow-nb shadow-black rounded-lg overflow-hidden w-full flex flex-col">
	<div class="relative overflow-visible flex flex-col items-stretch">
		<div class="border-b-2 w-full peer">
			<img src="/image/{product.image}" alt={product.name} class="aspect-3/2 object-cover w-full" />
		</div>
		<span
			class="peer bg-black text-white h-full text-ellipsis overflow-hidden px-2 py-1 font-semibold"
		>
			{product.name}
		</span>
	</div>
	<span class="flex-auto" />
	<span class="px-2 my-1 font-medium">Rp. {product.price.toLocaleString("id-ID")}</span>
	<div class="py-2 px-2 flex flex-row justify-end space-x-2">
		<!-- <button
			class="aspect-square p-1 hover:(bg-gray-3/60 shadow-none) rounded shadow-black shadow-nb-sm border-2 transition-all duration-300"
		>
			<span class="i-mdi:cart-plus h-6" />
		</button> -->
		<label
			class:hidden={!owned}
			for={product.image + "delete"}
			class="aspect-square bg-red-5 p-1 hover:(bg-green-4/80 shadow-none) rounded shadow-black shadow-nb-sm border-2 transition-all duration-300"
		>
			<span class="i-mdi:delete h-6" />
		</label>
		<label
			for={product.image}
			class="aspect-square bg-green-5 p-1 hover:(bg-green-4/80 shadow-none) rounded shadow-black shadow-nb-sm border-2 transition-all duration-300"
		>
			<span class="i-mdi:info h-6" />
		</label>
	</div>
	<label class="flex flex-col">
		<input
			id={product.image}
			type="checkbox"
			class="hidden peer"
			on:change={(e) => document.body.classList.toggle("overflow-hidden", e.currentTarget.checked)}
		/>
		<div
			class="hidden fixed inset-0 z-30 bg-sky-2/50 p-8 peer-checked:block overflow-y-scroll h-screen"
		>
			<Card props={{ colors: "green" }} class="max-w-lg mx-auto w-full space-y-4">
				<h2 class="text-center text-2xl font-bold">{product.name}</h2>
				<div class="border-y-2 -mx-4 box-content">
					<img
						src="/image/{product.image}"
						alt={product.name}
						class="aspect-3/2 object-cover w-full"
					/>
				</div>
				<div class="mt-4">
					<span class="font-semibold">Rp. {product.price.toLocaleString("id-ID")}</span>
					<p>{product.description || ""}</p>
				</div>
			</Card>
		</div>
	</label>

	<label class="flex flex-col">
		<input
			id={product.image + "delete"}
			type="checkbox"
			class="hidden peer"
			on:change={(e) => document.body.classList.toggle("overflow-hidden", e.currentTarget.checked)}
		/>
		<div
			class="hidden fixed inset-0 z-30 bg-sky-2/50 p-8 peer-checked:block overflow-y-scroll h-screen"
		>
			<form class={form} method="POST" use:enhance action="?/delete">
				<input type="hidden" name="image" value={product.image} />
				<input type="hidden" name="name" value={$page.data.owner.name} />
				<h1 class="font-bold text-xl">Hapus {product.name}</h1>
				<Button class="bg-red-5" type="submit">Hapus</Button>
			</form>
		</div>
	</label>
</Bg>
