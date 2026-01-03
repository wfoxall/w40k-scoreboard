<template>
    <USelectMenu 
        v-model="model"
        class="min-w-80" 
        :items="AllArmyConfigs" 
        placeholder="Select Army"
        :filter-fields="['detachment','faction','superfaction']"
        :ui="{content: ['max-h-120']}"
        >
        <template #item-label="{item}">{{ item.detachment }}</template>
        <template #item-description="{item}">{{ item.faction }} ({{ item.superfaction }})</template>
        <template #item-leading="{item}"><UAvatar v-if="item.icon" :src="`./avatars/${item.icon}`"/></template>
        <template #default="{modelValue}"><span class="h-5">{{ modelValue?.detachment ?? 'SELECT' }}</span></template>
    </USelectMenu>
</template>

<script setup lang="ts">
import { type ArmyConfig, useArmies } from '../composables/useArmies';

const model = defineModel<ArmyConfig>()

const {AllArmyConfigs} = useArmies();
</script>