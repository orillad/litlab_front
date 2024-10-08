<template class="container">
    <div class="mx-auto flex flex-col md:flex-row items-center md:items-start justify-center py-8 px-4">
        <div class="text-center md:text-left md:w-1/2 md:pr-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
                {{ $t("about.us") }}
            </h1>
            <p class="text-base md:text-lg mb-8">{{ $t("about.mission") }}</p>
            <p class="text-base md:text-lg mb-8">{{ $t("about.vision") }}</p>
            <p class="text-base md:text-lg mb-8">{{ $t("about.values") }}</p>
        </div>
        <!-- <div class="md:w-1/2 md:pl-12 mt-8 md:mt-0">
            <img src="~/assets/images/equip.png" alt="Imagen de nuestro equipo"
                class="mx-auto rounded-lg max-w-full h-auto">
        </div> -->
    </div>

    <div class="text-center max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
            {{ $t("about.ourTeam") }}
        </h1>
        <p class="text-base md:text-lg mt-6">{{ $t("about.teamDescription") }}</p>

        <div class="flex flex-col md:flex-row justify-center mt-10">
            <div class="md:w-1/3 p-4">
                <div class="bg-gray-100 p-6 rounded-lg">
                    <h2 class="text-xl font-bold text-primary">{{ $t("about.member1.name") }}</h2>
                    <p class="text-primary">{{ $t("about.member1.role") }}</p>
                </div>
            </div>
            <div class="md:w-1/3 p-4">
                <div class="bg-gray-100 p-6 rounded-lg">
                    <h2 class="text-xl font-bold text-primary">{{ $t("about.member2.name") }}</h2>
                    <p class="text-primary">{{ $t("about.member2.role") }}</p>
                </div>
            </div>
            <div class="md:w-1/3 p-4">
                <div class="bg-gray-100 p-6 rounded-lg">
                    <h2 class="text-xl font-bold text-primary">{{ $t("about.member3.name") }}</h2>
                    <p class="text-primary">{{ $t("about.member3.role") }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "default",
});
const { locale, setLocale } = useI18n()
</script>
