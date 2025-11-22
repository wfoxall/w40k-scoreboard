<template>
    <div>
        <UFormField label="Scoreboard Width">
            
            <UInputNumber v-model="scoresWidth"/>
        </UFormField>
    </div>
</template>

<script setup lang="ts">
import { useSettings } from '../composables/useSettings';
const {scoresWidth} = useSettings();
</script>
