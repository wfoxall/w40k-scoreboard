<template>
    <div 
        :style="{width: `${scoresWidth}px`}"
        class="bg-default p-4 space-y-4 box-border outline outline-gray-500"
        :class="{'outline-transparent': !showBorder}">
        <div class="px-4">
            <div class="text-2xl text-primary">{{ TitleText }}</div>
        </div>
        <ArmyScoreCard :score="PlayerAScore" :config="armyA" :state="ArmyAState"/>
        <ArmyScoreCard :score="PlayerBScore" :config="armyB" :state="ArmyBState"/>
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
const ArmyAState = computed<null|'turn'|'win'>(() => {
    if(MatchState.value === 'complete' && (PlayerAScore.value.primary + PlayerAScore.value.secondary) > (PlayerBScore.value.primary + PlayerBScore.value.secondary)) return 'win'
    return CurrentTurn.value === 'a' ? 'turn' : null
})
const ArmyBState = computed<null|'turn'|'win'>(() => {
    if(MatchState.value === 'complete' && (PlayerBScore.value.primary + PlayerBScore.value.secondary) > (PlayerAScore.value.primary + PlayerAScore.value.secondary)) return 'win'
    return CurrentTurn.value === 'b' ? 'turn' : null
})
</script>