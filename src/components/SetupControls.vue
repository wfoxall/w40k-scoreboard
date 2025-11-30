<template>
    <div>
        <UFormField label="Scoreboard Width">
            
            <UInputNumber v-model="scoresWidth"/>
        </UFormField>
        <UFormField label="Show Scoreboard Border">
            <USwitch v-model="showBorder"/>
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import { useSettings } from '../composables/useSettings';
const {
    scoresWidth,
    showBorder,
} = useSettings();
</script>
