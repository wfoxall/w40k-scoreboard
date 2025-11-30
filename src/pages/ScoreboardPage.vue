<template>
    <div 
        :style="{width: `${scoresWidth}px`}"
        class="bg-default p-6 space-y-6 box-border outline outline-gray-500"
        :class="{'outline-transparent': !showBorder}">
                    <div class="p-4 flex">
                        <div class="text-2xl text-primary">{{ TitleText }}</div>
                    </div>
                    <ArmyScoreCard :score="PlayerAScore" :config="armyA" :highlight="CurrentTurn == 'a'"/>
                    <ArmyScoreCard :score="PlayerBScore" :config="armyB" :highlight="CurrentTurn == 'b'"/>
                </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMatch } from '../composables/useMatch';
import { useSettings } from '../composables/useSettings';
import { useArmies } from '../composables/useArmies';

const {scoresWidth, showBorder} = useSettings();
const {armyA,armyB} = useArmies()

const TitleText = computed(() => {
    if(MatchState.value === 'complete') return `Final scores`
    return `Round ${CurrentRound.value}`
})

// const {aScore,bScore,PlayerTurn} = useScore()
const { PlayerAScore, PlayerBScore, CurrentTurn, CurrentRound, MatchState } = useMatch()
</script>