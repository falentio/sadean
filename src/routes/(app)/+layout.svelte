<main class="min-h-screen font-unbounded overflow-x-hidden overflow-y-auto flex flex-col">
	<nav class="border-b-2 px-8 py-2 bg-white flex flex-row gap-2">
		<a href="/" class="font-bold text-3xl md:text-5xl py-1">Sadean</a>
		<span class="flex-auto" />
		<a
			href="/login"
			class="bg-black inline-flex items-center hover:bg-zinc-9/80 text-white text-lg md:text-xl font-bold -my-2 px-4"
		>
			Login
		</a>
	</nav>
	<slot />
	<span class="flex-auto" />
	<footer class="bg-black text-white px-8 py-4 flex flex-row flex-wrap">
		<span class="text-6xl sm:text-7xl font-bold my-8 text-center mx-auto w-full md:w-max"
			>Sadean</span
		>
		<div class="flex-auto inline-flex flex-row-reverse justify-between px-12 space-x-8">
			<div
				class="flex flex-col [&>a]:(text-sm mt-1) [&>a:hover]:(text-sky-4) [&>span]:(font-semibold)"
			>
				<span>Pembuat</span>
				<a target="_blank" href="//github.com/falentio">Github</a>
				<a target="_blank" href="//facebook.com/kevin.falentio">Facebook</a>
				<a target="_blank" href="//instagram.com/kevinfalentio">Instagram</a>
			</div>
		</div>
		<span class="text-center w-full mt-8"> Rivaldi Kevin Falentio &copy; 2023</span>
	</footer>
</main>
