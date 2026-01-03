<template>
    <div class="space-y-4">
        <div class="text-2xl">Settings</div>
        <UFormField label="Scoreboard Width">
            <UInputNumber v-model="scoresWidth"/>
        </UFormField>
        <UFormField
            label="Show Scoreboard Border"
            help="Display a border around the whole scoreboard. Can be useful as a guide when setting up window capture sizes."
        >
            <USwitch v-model="showBorder"/>
        </UFormField>
        <UFormField
            label="Show Extra Points Icons"
            help="Icons will show on score card to indicate extra points. Eg. Painted army"
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
