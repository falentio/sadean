<script lang="ts">
	import { page } from "$app/stores";
	import ProductCard from "./ProductCard.svelte";
	import type { Product } from "$lib/schema";
	import Fuse from "fuse.js";
	let filter: string;
	$: products = $page.data.products as Product[];
	$: fuse = new Fuse(products, {
		keys: ["name"]
	});
	$: filtered = filter ? fuse.search(filter).map((i) => i.item) : products;
</script>

<div class="flex flex-row flex-wrap mx-auto w-full justify-end gap-4 max-w-lg mx-auto">
	<input
		bind:value={filter}
		placeholder="Cari nama produk"
		class="px-4 py-2 rounded-full border-2 shadow-nb shadow-black flex-auto bg-sky-2/80 focus:(border-transparent ring-2 ring-sky-5 outline-0 shadow-sky-5) placeholder-black"
	/>
	<!-- <Button class="bg-green-5">Kategori</Button> -->
</div>
<div
	class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full items-stretch mx-auto justify-center"
>
	{#each filtered as p (p.image)}
		<ProductCard product={p} />
	{/each}
</div>
