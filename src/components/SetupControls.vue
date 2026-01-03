<template>
    <div class="space-y-4">
        <div class="text-2xl">Settings</div>
        <UFormField label="Scoreboard Width" description="The width of the scoreboard (in pixels)">
            <UInputNumber v-model="scoresWidth"/>
        </UFormField>
        <UFormField
            label="Show border around scoreboard"
            description="Can be useful as a guide when setting up window capture sizes."
        >
            <USwitch v-model="showBorder"/>
        </UFormField>
        <UFormField
            label="Show Extra Points Icons"
            description="Indicate when extra points are applied. Eg. Battle Ready armies"
        >
            <USwitch v-model="showExtraPointsIcons"/>
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
    showExtraPointsIcons,
    armyHighlightStyle
} = useSettings();

const armyHighlightStyleOptions: SelectItem[] = [
    {label: 'Ring', value: 'ring'},
    {label: 'Glow', value: 'glow'},
]
</script>
