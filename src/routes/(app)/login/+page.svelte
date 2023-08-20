<script lang="ts">
	import { enhance } from "$app/forms";
	import Form, { form } from "$lib/components/Form.svelte";
	import type { Issues } from "valibot";
	let issues: Issues | null;
	import { login } from "./schema";
	import Button from "$lib/components/Button.svelte";
</script>

<form method="POST" use:enhance class={form}>
	<h1 class="font-bold text-center text-3xl">login</h1>
	<Form bind:issues schema={login} />
	<span> Belum punya akun? <a class="text-blue-6 underline" href="/signup">Daftar</a></span>
	<div class="w-full flex flex-col">
		<Button disabled={!!issues} class="bg-green-5 hover:(shadow-none bg-green-4)">Login</Button>
	</div>
</form>
