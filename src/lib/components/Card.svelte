<script lang="ts" context="module">
	import { cva, cx } from "class-variance-authority";
	import type { VariantProps } from "class-variance-authority";
	export const config = {
		variants: {
			colors: {
				green: ["bg-green-5"],
				transparent: []
			}
		},
		defaultVariants: {
			colors: "transparent"
		}
	} as const;
	export const card = cva(["shadow-nb-lg shadow-black p-4 rounded-lg border-3 "], config);
	export type Card = VariantProps<typeof card>;
</script>

<script lang="ts">
	export let props: Card = {};
</script>

<div class={cx(card(props), $$props.class)}>
	<slot />
</div>
