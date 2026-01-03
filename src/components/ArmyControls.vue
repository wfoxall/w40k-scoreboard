<template>
    <div class="space-y-4">
        <div class="text-2xl">Pick Armies</div>
        <div class="grid md:grid-cols-2 gap-6">
            <div class="flex flex-col gap-4">
                <h2 class="text-xl">Player A</h2>
                <UFormField label="Faction & Detachment">
                    <ArmySelect v-model="armyA"/>
                </UFormField>
                <UCheckbox v-model="ArmyABattleReady" label="Battle Ready" description="The player's army is sufficiently painted to be considered 'battle ready' (+10 VP)"/>
            </div>
            <div class="flex flex-col gap-4">
                <h2 class="text-xl">Player B</h2>
                <UFormField label="Faction & Detachment">
                    <ArmySelect v-model="armyB"/>
                </UFormField>
                <UCheckbox v-model="ArmyBBattleReady" label="Battle Ready" description="The player's army is sufficiently painted to be considered 'battle ready' (+10 VP)"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useArmies } from '../composables/useArmies';

const ArmyABattleReady = computed({
    get: () => {return !!armyA.value.battleReady},
    set: (val: boolean) => {
        setArmyBattleReady('a',val);
    }
})
const ArmyBBattleReady = computed({
    get: () => {return !!armyB.value.battleReady},
    set: (val: boolean) => {
        setArmyBattleReady('b',val);
    }
})

const {armyA,armyB, setArmyBattleReady} = useArmies();
</script>