<script lang="ts">
	import Form, { form } from "$lib/components/Form.svelte";
	import type { Issues } from "valibot";
	import { updateSchema } from "./schema";
	import Button from "$lib/components/Button.svelte";
	import { enhance } from "$app/forms";
	let issues: Issues | null;
</script>

<form class={form} method="POST" use:enhance>
	<h1 class="text-center font-bold text-3xl">Pengaturan</h1>
	<Form
		bind:issues
		placeholders={{
			facebook: "kevin.falentio",
			instagram: "kevinfalentio",
			whatsapp: "628212xxxxxxxx",
			twitter: "falentio_"
		}}
		schema={updateSchema}
	/>
	<Button class="justify-center bg-green-5">Ubah</Button>
</form>
