<script lang="ts">
	export let color = "white";
	export let tag = "div";
</script>

<svelte:element
	this={tag}
	class:bg-white={color === "white"}
	class:bg-sky-5={color === "sky"}
	class:bg-green-5={color === "green"}
	class:bg-blue-5={color === "blue"}
	class:bg-red-5={color === "red"}
	{...$$props}
>
	<slot />
</svelte:element>
