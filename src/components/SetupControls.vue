<template>
    <div class="space-y-4">
        <div class="text-2xl">Settings</div>
        <UFormField label="Scoreboard Width">
            <UInputNumber v-model="scoresWidth"/>
        </UFormField>
        <UFormField label="Show Scoreboard Border">
            <USwitch v-model="showBorder"/>
        </UFormField>
        <UFormField label="Army Score Highlight Style">
            <USelect v-model="armyHighlightStyle" :items="armyHighlightStyleOptions"/>
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';
import { useSettings } from '../composables/useSettings';
const {
    scoresWidth,
    showBorder,
    armyHighlightStyle
} = useSettings();

const armyHighlightStyleOptions: SelectItem[] = [
    {label: 'Ring', value: 'ring'},
    {label: 'Glow', value: 'glow'},
]
</script>
