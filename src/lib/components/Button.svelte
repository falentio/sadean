<script lang="ts">
	$: tag = $$props.for ? "label" : $$props.href ? "a" : "button";
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	class="border-2 px-4 py-2 shadow-nb hover:shadow-none transition-box-shadow shadow-black rounded-full capitalize inline-flex flex-row items-center disabled:(bg-gray-3 text-gray-6 shadow-none) {$$props.class}"
>
	<slot />
</svelte:element>
