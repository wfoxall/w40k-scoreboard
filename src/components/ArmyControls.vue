<template>
    <div class="space-y-4">
        <div class="text-2xl">Pick Armies</div>
        <div class="grid-cols-2">
            <div class="flex flex-col gap-4">
                <UFormField label="Team A">
                    <ArmySelect v-model="armyA"/>
                </UFormField>
                <UFormField label="Team B">
                    <ArmySelect v-model="armyB"/>
                </UFormField>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArmies } from '../composables/useArmies';

const {armyA,armyB} = useArmies();
</script>