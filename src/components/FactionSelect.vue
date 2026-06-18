<template>
    <USelectMenu
        v-model="model"
        :items="factions"
        value-key="faction"
    >
        <template #item-label="{item}">{{ item.faction }}</template>
        <template #item-description="{item}">{{ item.superfaction }}</template>
        <template #item-leading="{item}"><UAvatar v-if="item.icon" :src="`./avatars/${item.icon}`"/></template>
        <template #default="{modelValue}">
            <span class="h-5" v-if="modelValue">{{modelValue}}</span>
            <span class="h-5" v-else>Select faction</span>
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
import { factions } from '../config/armies';
const model = defineModel<string>()
</script>

<style scoped>

</style>