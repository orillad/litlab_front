<template class="container relative"> <!-- Agregamos la clase relative al contenedor padre -->
    <div class="mx-auto flex flex-col md:flex-row items-center md:items-start justify-center py-8 px-4">
        <div class="text-left md:text-left md:w-1/2 md:pr-12">
            <h1 class="text-4xl md:text-5xl mb-4">
                {{ $t("index.the") }}
                <span class="text-secondary font-bold">{{ $t("index.future") }}</span>
                <br>
                {{ $t("index.of") }}
                <span class="text-secondary font-bold">{{ $t("index.books") }}</span>
                <br>
                <span class="font-bold">
                    {{ $t("index.iaExperience") }}<span class="text-secondary">.</span>
                </span>
            </h1>
            <p class="text-base md:text-lg mb-8">{{ $t("index.presentation") }}</p>
            <!-- <p class="text-base md:text-lg mb-8 hidden sm:block">{{ $t("index.presentation") }}</p> -->


            <div class="flex flex-col md:flex-row items-center">
                <button
                    class="bg-secondary hover:bg-secondary_hovered/95 text-primary active:bg-secondary_active px-6 py-3 rounded-full font-semibold mb-4 md:mb-0 md:mr-4 inline-flex items-center justify-center w-full md:w-auto"
                    onclick="window.location.href='/form';">
                    <span>{{ $t("index.create") }} <b>{{ $t("index.bookNow") }}</b></span>


                    <img class="ml-2 w-6 h-6" src="~/assets/images/book_svg.svg" alt="">
                </button>

                <button
                    class="bg-primary border border-secondary text-white hover:bg-secondary active:bg-secondary_active hover:text-black px-6 py-3 rounded-full flex items-center justify-center w-full md:w-auto">
                    <span class="mr-2">{{ $t("index.what") }} <b>{{ $t("index.do") }}</b></span>
                    <img src="~/assets/images/i.svg" class="w-6 h-6 button-img">
                </button>

            </div>

        </div>
        <div class="md:w-1/2 md:pl-12 mt-8 md:mt-0 mb-36">
            <img src="~/assets/images/llibre_maquina.svg" alt="Imagen de muestra"
                class="mx-auto rounded-lg w-4/5 lg:mr-52 h-auto"> <!-- Cambiar max-w-full a w-96 -->
        </div>

        <!-- Flecha SVG posicionada absolutamente -->
        <!-- <img src="~/assets/images/arrow.svg" alt="Arrow pointing to the image" class="absolute"
            style="top: 5vh; left: 30vw; width: 15vw;"> -->

    </div>

    <div class="text-center max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-5xl mb-4">
            {{ $t("index.create_book") }}
            <br>
            {{ $t("index.with") }}
            <span class="text-secondary font-bold ">{{ $t("index.history") }}</span>
            <br>
            <span class="text-secondary font-bold ">{{ $t("index.ilustration") }}</span>
        </h1>
        <p class="text-base md:text-lg mt-6 font-bold">{{ $t("index.alucinar") }}</p>
        <p class="text-base md:text-lg mt-6">{{ $t("index.description") }}</p>

        <button
            class="bg-secondary hover:bg-secondary_hovered/95 mt-10 text-black active:bg-secondary_active px-6 py-3 rounded-full font-semibold mb-4 md:mb-0 md:mr-4 inline-flex items-center justify-center w-full md:w-auto"
            onclick="window.location.href='/form';">
            <span>{{ $t("index.create") }} <b>{{ $t("index.bookNow") }}</b></span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="ml-2 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
        </button>
    </div>



</template>

<script setup>
definePageMeta({
    layout: "default",
});
const { locale, setLocale } = useI18n()
</script>


<style scoped>
.button-img {
    transition: filter 0.0s ease;
}

button:hover .button-img {
    filter: invert(1);
}
</style>