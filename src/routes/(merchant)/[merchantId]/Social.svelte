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
		<Button target="_blank" class="bg-blue-5" href="//facebook.com/{owner.facebook}">
			<span class="i-mdi:facebook w-8" />
			Facebook
		</Button>
	{/if}
	{#if owner.instagram}
		<Button target="_blank" class="bg-rose-5" href="//instagram.com/{owner.instagram}">
			<span class="i-mdi:instagram w-8" />
			Instagram
		</Button>
	{/if}
	{#if owner.twitter}
		<Button target="_blank" class="bg-lightblue-5" href="//twitter.com/{owner.twitter}">
			<span class="i-mdi:twitter w-8" />
			Twitter
		</Button>
	{/if}
	{#if owner.whatsapp}
		<Button target="_blank" class="bg-green-5" href="//wa.me/{owner.whatsapp}">
			<span class="i-mdi:whatsapp w-8" />
			Whatsapp
		</Button>
	{/if}
</div>
