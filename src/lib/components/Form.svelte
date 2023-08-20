<script lang="ts" context="module">
	export const form = [
		"shadow-nb-lg space-y-2 shadow-black border-2 rounded m-6 p-4 flex flex-col gap-2 max-w-lg w-full mx-auto bg-sky-4",
		"[&>label]:(flex flex-col)",
		"[&>label>span]:(text-xl font-semibold capitalize)",
		"[&>label>input]:(rounded-full border-2 px-4 py-2 bg-sky-3 text-black placeholder-gray-5)",
		"focus:[&>label>input]:(ring-3 border-transparent ring-blue-5 outline-none bg-sky-2)",
		"[&_div]:(items-center)"
	].join(" ");
</script>

<script lang="ts">
	import {
		parse,
		type BaseSchema,
		type ObjectSchema,
		ValiError,
		type Issues,
		equal,
		type NumberSchema,
		object,
		merge,
		string
	} from "valibot";
	export let schema: ObjectSchema<{ [s: string]: BaseSchema }>;
	export let names: Record<string, string> = {};
	export let placeholders: Record<string, string> = {};
	export let value: Record<string, unknown> = {};
	export let omit: string[] = [];
	export let issues: Issues | null = null;
	let inputed = false;
	$: keys = Object.keys(schema.object);
	$: if (inputed) {
		try {
			issues = null;
			if (schema.object.confirmation) {
				schema = merge([
					schema,
					object({
						confirmation: string("Wajib di isi", [
							equal(value.password as string, "password tidak sama")
						])
					})
				]);
			}
			value = parse(schema, value);
		} catch (e) {
			if (e instanceof ValiError) {
				issues = e.issues;
			}
		}
	}
	function getIssue(issues: Issues | null, k: string) {
		return issues?.find((i) => {
			return i.path![0].key === k;
		});
	}
	function isNumber(schema: ObjectSchema<any>, k: string) {
		return (
			(schema.object[k as keyof typeof schema] as unknown as NumberSchema)?.schema === "number"
		);
	}
</script>

{#each keys as k (k)}
	{#if !omit.includes(k)}
		<label>
			<span>{names[k] || k}</span>
			{#if k === "password" || k === "confirmation"}
				<input
					on:keydown={() => (inputed = true)}
					id={k}
					name={k}
					placeholder={placeholders[k] || names[k] || k}
					autocomplete={k}
					type="password"
					bind:value={value[k]}
				/>
			{:else if isNumber(schema, k)}
				<input
					on:keydown={() => (inputed = true)}
					id={k}
					name={k}
					placeholder={placeholders[k] || names[k] || k}
					autocomplete={k}
					type="number"
					bind:value={value[k]}
				/>
			{:else}
				<input
					on:keydown={() => (inputed = true)}
					id={k}
					name={k}
					placeholder={placeholders[k] || names[k] || k}
					autocomplete={k}
					type="text"
					bind:value={value[k]}
				/>
			{/if}
			<span class:invisible={!getIssue(issues, k)} class="text-red-6 text-sm! font-normal!"
				>{getIssue(issues, k)?.message}</span
			>
		</label>
	{/if}
{/each}
