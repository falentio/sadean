<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import type { AccountPublic } from "$lib/schema";
	$: owner = $page.data.owner as AccountPublic;
</script>

<div
	class="flex flex-wrap flex-col text-xl justify-center items-stretch [&>*]:(inline-flex flex-row gap-2) gap-6 max-w-md mx-auto"
>
	{#if owner.facebook}
		<Button class="bg-blue-5">
			<span class="i-mdi:facebook w-8" />
			Facebook
		</Button>
	{/if}
	{#if owner.instagram}
		<Button class="bg-rose-5">
			<span class="i-mdi:instagram w-8" />
			Instagram
		</Button>
	{/if}
	{#if owner.twitter}
		<Button class="bg-lightblue-5">
			<span class="i-mdi:twitter w-8" />
			Twitter
		</Button>
	{/if}
	{#if owner.whatsapp}
		<Button class="bg-green-5">
			<span class="i-mdi:whatsapp w-8" />
			Whatsapp
		</Button>
	{/if}
</div>
