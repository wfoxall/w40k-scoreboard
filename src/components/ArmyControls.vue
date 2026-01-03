<template>
    <div class="space-y-4">
        <div class="text-2xl">Pick Armies</div>
        <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-4">
                <h2 class="text-xl">Player A</h2>
                <UFormField label="Faction & Detachment">
                    <ArmySelect v-model="armyA"/>
                </UFormField>
                <UCheckbox v-model="ArmyAPainted" label="Army Painted" />
            </div>
            <div class="flex flex-col gap-4">
                <h2 class="text-xl">Player B</h2>
                <UFormField label="Faction & Detachment">
                    <ArmySelect v-model="armyB"/>
                </UFormField>
                <UCheckbox v-model="ArmyBPainted" label="Army Painted" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useArmies } from '../composables/useArmies';

const ArmyAPainted = computed({
    get: () => {return !!armyA.value.painted},
    set: (val: boolean) => {
        setArmyPainted('a',val);
    }
})
const ArmyBPainted = computed({
    get: () => {return !!armyB.value.painted},
    set: (val: boolean) => {
        setArmyPainted('b',val);
    }
})

const {armyA,armyB, setArmyPainted} = useArmies();
</script>