<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import ShoppingApp from "$lib/undraw/ShoppingApp.svelte";
</script>

<div class="bg-sky-4 border-b-2">
	<div class="w-full max-w-screen-2xl mx-auto p-8 flex flex-col lg:flex-row">
		<div class="flex flex-col md:pr-6 space-y-6 mb-6">
			<span class="text-4xl leading-12 sm:(text-5xl leading-16) md:(text-6xl leading-20) font-bold">
				<span class="text-blue-7">Kumpulkan</span> semua produkmu dalam satu halaman
			</span>
			<p class="text-lg max-w-2xl text-black/95">
				Membantu mu untuk memasarkan produkmu, dan juga memudahkan pembeli untuk melihat produk yang
				kamu miliki
			</p>
			<Button class="bg-green-5 hover:bg-green-6 w-max" href="/login">Mulai</Button>
		</div>
		<Card class="bg-green-5 w-max mx-auto overflow-visible h-max my-6">
			<ShoppingApp class="h-44 sm:h-72" />
		</Card>
	</div>
</div>

<span class="w-full text-center text-7xl border-b-2 py-4"> Fitur </span>
<div
	class="grid grid-cols-1 lg:grid-cols-2 items-stretch [&>*]:(border-b-2 border-r-2 px-16 py-8 xl:(px-24 py-12)) [&_h2]:(text-3xl font-semibold) [&_div]:(flex flex-row items-center mb-4 h-12) [&_div>span]:(w-12 mr-2)"
>
	<section class="bg-green-5">
		<div>
			<span class="i-mdi:timer-star-outline" />
			<h2>Cepat</h2>
		</div>
		<p>
			Kecepatan selalu dijaga dengan seksama, sehingga pengalaman pengguna selalu dalam keadaan yang
			paling optimal.
		</p>
	</section>
	<section class="bg-green-5">
		<div>
			<span class="i-mdi:currency-usd-off" />
			<h2>Gratis</h2>
		</div>
		<p>Tidak ada biaya sedikitpun yang dipungut untuk menggunakan layanan ini.</p>
	</section>
	<section class="bg-green-5">
		<div>
			<span class="i-mdi:advertisements-off" />
			<h2>Tanpa Iklan</h2>
		</div>
		<p>
			Demi kenyamanan pengguna, layanan ini bebas dari iklan yang mengganggu pengalaman pengguna
		</p>
	</section>
	<section class="bg-green-5">
		<div>
			<span class="i-mdi:store" />
			<h2>Toko Impianmu</h2>
		</div>
		<p>Buat katalog barang untuk toko mu dengan mudah tanpa kebingungan memprogram website.</p>
	</section>
</div>
