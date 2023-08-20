<script lang="ts">
	import { enhance } from "$app/forms";
	import Button from "$lib/components/Button.svelte";
	import Form, { form } from "$lib/components/Form.svelte";
	import { omit, type Issues } from "valibot";
	import { signup } from "./schema";
	import { browser } from "$app/environment";
	let issues: Issues | null;
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

<form class={form} use:enhance method="POST">
	<h1 class="font-bold text-center text-3xl">Daftar</h1>
	<Form
		bind:issues
		names={{
			name: "Nama",
			confirmation: "Konfirmasi Password"
		}}
		placeholders={{
			facebook: "kevin.falentio",
			instagram: "kevinfalentio",
			whatsapp: "628212xxxxxxxx",
			twitter: "falentio_"
		}}
		schema={omit(signup, ["image"])}
	/>
	<label>
		<span> Foto Produk</span>
		{#if image?.item(0)}
			<div class="border-2 mx-6 my-2 overflow-hidden aspect-square rounded-full w-48 mx-auto">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					on:click|preventDefault
					bind:this={imgEl}
					alt="f"
					class="object-cover aspect-1/1 w-full"
				/>
			</div>
		{/if}
		<div class="rounded-full bg-sky-3 border-2 px-4 text-center py-2">Upload Foto (1:1)</div>
		<input bind:files={image} type="file" name="image" accept="image/*" class="hidden" />
	</label>
	<span> Sudah punya akun? <a class="text-blue-6 underline" href="/login">Login</a></span>
	<div class="w-full flex flex-col">
		<Button disabled={!!issues} class="bg-green-5 hover:(shadow-none bg-green-4)">Daftar</Button>
	</div>
</form>
