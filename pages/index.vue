<template class="container">
    <div class="mx-auto flex flex-col md:flex-row items-center md:items-start justify-center py-8 px-4">
        <div class="text-center md:text-left md:w-1/2 md:pr-12">
            <h1 class="text-5xl font-bold mb-4">{{ $t("index.the") }} <span class="text-secondary">{{ $t("index.future")
                    }}</span> <br> {{ $t("index.of") }} <span class="text-secondary">{{ $t("index.books") }}\</span>
                <br> {{ $t("index.iaExperience") }}.</h1>
            <p class="text-lg mb-8">{{ $t("index.presentation") }}</p>


            <button
                class="bg-secondary hover:bg-secondary_hovered/95 text-black active:bg-secondary_active px-6 py-3 rounded-full font-semibold mb-4 inline-flex items-center justify-center w-70"
                onclick="window.location.href='/form';">
                <span>{{ $t("index.create") }} <b>{{ $t("index.bookNow") }}</b></span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="ml-2 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
            </button>

            <button
                class="bg-primary border border-secondary text-white hover:bg-secondary active:bg-secondary_active hover:text-black px-6 py-3 rounded-full flex items-center justify-center w-60">
                <span class="mr-2">{{ $t("index.what") }} <b>{{ $t("index.do") }}</b></span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
            </button>


        </div>
        <div class="md:w-1/2 md:pl-12">
            <img src="~/assets/images/llibre_maquina.png" alt="Imagen de muestra" class="mx-auto rounded-lg">
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const { locale, setLocale } = useI18n()
</script>