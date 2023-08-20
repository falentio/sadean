<script lang="ts">
	import { browser } from "$app/environment";
	import { enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import Form, { form } from "$lib/components/Form.svelte";
	import { product } from "$lib/schema";
	let image: FileList;
	let imgEl: HTMLImageElement;
	$: if (browser) {
		const file = image?.item(0);
		if (!file) {
			break $;
		}
		const fileReader = new FileReader();
		fileReader.addEventListener(
			"load",
			(e) => {
				imgEl.src = fileReader.result as string;
			},
			false
		);
		fileReader.readAsDataURL(file);
	}
</script>

<form class={form} method="POST" use:enhance>
	<h1 class="text-center font-bold text-4xl">Produk Baru</h1>
	<Form schema={product} omit={["image"]} />
	<label>
		<span> Foto Produk</span>
		{#if image?.item(0)}
			<div class="border-2 mx-6 my-2 overflow-hidden aspect-3/2">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					on:click|preventDefault
					bind:this={imgEl}
					alt="f"
					class="object-cover aspect-3/2 w-full"
				/>
			</div>
		{/if}
		<div class="rounded-full bg-sky-3 border-2 px-4 text-center py-2">Upload Foto (2:3)</div>
		<input bind:files={image} type="file" name="image" accept="image/*" class="hidden" />
	</label>
	<Button class="bg-green-5 justify-center">Tambahkan</Button>
</form>
