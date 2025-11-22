<template>
    <div>
        <h1>Armies</h1>
        <div class="grid-cols-2">
            <div class="flex flex-col">
                <UFormField label="Team A">
                    <USelectMenu v-model="armyA" class="min-w-80" :items="AllArmyConfigs" placeholder="Select Army" :filter-fields="['detachment','faction','superfaction']">
                        <template #item-label="{item}">{{ item.detachment }}</template>
                        <template #item-description="{item}">{{ item.faction }} ({{ item.superfaction }})</template>
                        <template #item-leading="{item}"><UAvatar v-if="item.icon" :src="`/avatars/${item.icon}`"/></template>
                    </USelectMenu>
                </UFormField>
                <UFormField label="Team B">
                    <USelectMenu v-model="armyB" class="min-w-80" :items="AllArmyConfigs" placeholder="Select Army" :filter-fields="['detachment','faction','superfaction']">
                        <template #item-label="{item}">{{ item.detachment }}</template>
                        <template #item-description="{item}">{{ item.faction }} ({{ item.superfaction }})</template>
                    </USelectMenu>
                </UFormField>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArmies } from '../composables/useArmies';

const {armyA,armyB, AllArmyConfigs} = useArmies();

</script>