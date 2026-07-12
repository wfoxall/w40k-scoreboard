<template>
    <USelectMenu
        v-model="model"
        :items="Items"
        value-key="key"
    >
        <template #default="{modelValue}">
            <span class="h-5" v-if="modelValue">{{modelValue}}</span>
            <span class="h-5" v-else>Select faction</span>
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { factions } from '../config/armies';
import type { SelectMenuItem } from '@nuxt/ui';

// const Items = computed<SelectMenuItem[]>(() => factions.map(([k,v]) => ({key: k, label: v.faction, avatar: {src: `./avatars/${v.icon}`} } satisfies SelectMenuItem)))
const Items = computed<SelectMenuItem[]>(() => factions.map(f => ({
    key: f.faction,
    label: f.faction,
    description: f.superfaction,
    avatar: {src: `/avatars/${f.icon}`},
    onSelect: () => {
        model.value = f.faction
    }
})))
const model = defineModel<string|null>({default: () => null})
</script>

<style scoped>

</style>