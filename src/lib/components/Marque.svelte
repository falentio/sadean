<script lang="ts">
	export let tag = "span";
	export let separator = " - ";
	export let text: string;
</script>

<svelte:element
	this={tag}
	class="overflow-visible inline-flex flex-row w-full whitespace-nowrap {$$props.class}"
>
	<span style:f="f" class="animate-[marque_8s_linear_infinite]"
		>{(text + separator).repeat(10)}</span
	>
</svelte:element>

<style>
</style>
