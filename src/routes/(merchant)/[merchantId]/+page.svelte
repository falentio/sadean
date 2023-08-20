<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import ProductList from "./ProductList.svelte";
	import Social from "./Social.svelte";
	$: owned = $page.data.account?.name === $page.data.owner.name;
</script>

<div class="p-4 flex flex-col space-y-8 overflow-visible">
	<div class="mx-auto flex flex-col flex-wrap w-full gap-4 max-w-lg">
		<Card class="flex flex-col items-center flex-auto bg-sky-4 space-y-4">
			<div class="rounded-full mx-auto h-48 aspect-square overflow-hidden border-black border-2">
				<img src="/image/{$page.data.owner.image}" alt="ff" class="object-cover h-full" />
			</div>
			<h1 class="font-bold text-5xl w-full text-center">{$page.data.owner.name}</h1>
			{#if owned}
				<Button class="bg-green-5 hover:bg-green-4/80" href="/setting">Pengaturan</Button>
			{/if}
		</Card>
		<Card class="flex-col bg-sky-4 [&:has(button)]:flex hidden">
			<Social />
		</Card>
	</div>
	<span class="-ml-4 bg-white border-y-2 w-full box-content text-center text-4xl font-bold p-4">
		Katalog
	</span>
	<ProductList />
	<div class="w-full flex flex-col items-stretch" class:hidden={!owned}>
		<Button class="justify-center bg-green-5" href="{$page.url.href}/add-product">
			<span class="i-mdi:plus-circle w-6 mx-2" />
			Tambahkan Produk
		</Button>
	</div>
	<!-- <div class="sticky bottom-0 z-20 pb-4 w-full mx-auto">
		<Bg class="rounded-lg w-full">
			<Card class="relative z-50 flex flex-row space-x-2">
				<div class="flex-auto flex-col flex">
					<span class="font-semibold text-lg"> 5 Barang </span>
					<span class="text-sm"> Rp. 246.000,00</span>
				</div>
				<Button href="/{$page.params.merchantId}/cart" class="border-b-2 aspect-square p-2!">
					<span class="i-mdi:cart w-8" />
				</Button>
			</Card>
		</Bg>
	</div> -->
</div>

<!-- 
<Bg
	class="overflow-hidden rounded-full fixed bottom-4 right-4 border-2 shadow-black shadow-nb inline-flex flex-col"
>
	<button class="border-b-2 p-1" on:click={scrollTop}>
		<span class="i-mdi:arrow-up w-8" />
	</button>
	<a href="/{$page.params.merchantId}/cart" class="border-b-2 p-1">
		<span class="i-mdi:cart w-8" />
	</a>
</Bg> -->
