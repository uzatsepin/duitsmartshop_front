<template>
    <div>
        edit product {{ slug }}
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
</script>

<style scoped>

</style>