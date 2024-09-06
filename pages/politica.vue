<template>
    <div class="mx-auto max-w-2xl p-4">

        <h1 class="text-5xl font-bold mb-4 text-center">{{ $t('privacyPolicy.title') }}</h1>

        <p><b>{{ $t('privacyPolicy.title') }}</b></p>
        <br>
        <p>{{ $t('privacyPolicy.lastUpdated') }}</p>
        <br>

        <p>{{ $t('privacyPolicy.welcomeMessage') }}</p>
        <br>

        <p><strong>1. {{ $t('privacyPolicy.section1Title') }}</strong></p>
        <br>
        <ul>
            <li v-for="(content, index) in $tm('privacyPolicy.section1Content')" :key="index">
                {{ $rt(content) }}
            </li>
        </ul>
        <br>

        <p><strong>2. {{ $t('privacyPolicy.section2Title') }}</strong></p>
        <br>
        <ul>
            <li v-for="content in $tm('privacyPolicy.section2Content')" :key="content">{{ $rt(content) }}</li>
        </ul>
        <br>

        <p><strong>{{ $t('privacyPolicy.section3Title') }}</strong></p>
        <br>
        <p>{{ $t('privacyPolicy.section3Content') }}</p>
        <br>

        <p><strong>4. {{ $t('privacyPolicy.section4Title') }}</strong></p>
        <br>
        <p>{{ $t('privacyPolicy.section4Content') }}</p>
        <br>

        <p><strong>5. {{ $t('privacyPolicy.section5Title') }}</strong></p>
        <br>
        <p>{{ $t('privacyPolicy.section5Content') }}</p>
        <br>

        <p><strong>6. {{ $t('privacyPolicy.section6Title') }}</strong></p>
        <br>
        <p>{{ $t('privacyPolicy.section6Content') }}</p>
        <br>

        <p><strong>7. {{ $t('privacyPolicy.section7Title') }}</strong></p>
        <br>
        <p>{{ $t('privacyPolicy.section7Content') }}</p>

        <br>

        <p><strong>{{ $t('privacyPolicy.contactTitle') }}</strong></p>
        <p>{{ $t('privacyPolicy.contactMessage') }} <a href="mailto:contacte@litlab.com">contacte@litlab.com</a>.</p>
    </div>
</template>

<script setup>
  definePageMeta({
    layout: 'default',
  });
</script>

<style scoped>
/* Component styles */
</style>
