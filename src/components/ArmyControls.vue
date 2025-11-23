<template>
    <div>
        <h1>Armies</h1>
        <div class="grid-cols-2">
            <div class="flex flex-col">
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