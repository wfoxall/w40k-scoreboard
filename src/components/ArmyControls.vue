<template>
    <div class="space-y-4">
        <div class="text-2xl">Pick Armies</div>
        <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-4">
                <h2 class="text-xl">Player A</h2>
                <UFormField label="Faction & Detachment">
                    <ArmySelect army-key="playerA"/>
                </UFormField>
                <UCheckbox v-model="ArmyABattleReady" label="Battle Ready" description="The player's army is sufficiently painted to be considered 'battle ready' (+10 VP)"/>
            </div>
            <div class="flex flex-col gap-4">
                <h2 class="text-xl">Player B</h2>
                <UFormField label="Faction & Detachment">
                    <ArmySelect army-key="playerB"/>
                </UFormField>
                <UCheckbox v-model="ArmyBBattleReady" label="Battle Ready" description="The player's army is sufficiently painted to be considered 'battle ready' (+10 VP)"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useArmy } from '../composables/useArmy';

const ArmyABattleReady = computed({
    get: () => {return !!armyA.armyConfig.value.battleReady},
    set: (val: boolean) => {
        armyA.setBattleReady(val);
    }
})

const ArmyBBattleReady = computed({
    get: () => {return !!armyB.armyConfig.value.battleReady},
    set: (val: boolean) => {
        armyB.setBattleReady(val);
    }
})

const armyA = useArmy('playerA');
const armyB = useArmy('playerB');
</script>