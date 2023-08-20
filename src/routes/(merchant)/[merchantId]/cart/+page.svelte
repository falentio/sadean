<script lang="ts">
	import Button from "$lib/components/Button.svelte";
</script>

<section class="flex flex-col min-h-screen bg-sky-2">
	<div class="flex flex-row bg-sky-5 items-center px-4 py-6 space-x-2 border-b-2">
		<Button href="." class="aspect-square p-1! h-max">
			<span class="i-mdi:arrow-left w-6" />
		</Button>
		<h1 class="text-4xl font-bold my-auto">Keranjang</h1>
	</div>
	<div class="flex flex-col space-y-4 px-4 py-6 bg-sky-2">
		{#each Array(100) as _}
			<div
				class="grid grid-cols-3 rounded-md bg-white overflow-hidden shadow-nb shadow-black border-2 max-w-sm mx-auto"
			>
				<img src="//picsum.photos/300" class="aspect-3/2 w-full" alt="product" />
				<div class="col-span-2 border-l-2 p-1 flex flex-col">
					<div class="flex flex-row justify-between">
						<span class="font-semibold text-lg"> Anu </span>
						<Button class="aspect-square p-1! shadow-nb-sm bg-red-4">
							<span class="i-mdi:delete w-4" />
						</Button>
					</div>
					<span class="text-sm">Rp. 50.0000</span>
				</div>
			</div>
		{/each}
	</div>
	<span class="flex-auto" />
	<div class="sticky bottom-0 p-4 pt-0 flex items-center flex-col">
		<Button class="w-full bg-green-5 max-w-sm">
			<span class="i-mdi:whatsapp w-6 mx-2" />Beli (Rp. 50.0000)</Button
		>
	</div>
</section>
