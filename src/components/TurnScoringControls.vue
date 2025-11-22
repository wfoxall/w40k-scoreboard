<template>
<div class="p-6 space-y-6">
        <div class="text-2xl">{{TitleText}}</div>
                <div class="w-max grid grid-cols-[auto_auto_auto_auto] gap-y-4 gap-x-3 items-center">
                    <div class="text-xl text-muted">Primary</div>
                    <div class="w-8 text-xl text-center text-toned">{{ turn.primary }}</div>
                    <UButton variant="soft" size="lg" class="w-10 justify-center" @click="subtractPrimary(1)">-1</UButton>
                    <UFieldGroup>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addPrimary(1)">1</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addPrimary(2)">2</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addPrimary(3)">3</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addPrimary(4)">4</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addPrimary(5)">5</UButton>
                    </UFieldGroup>
                    
                    <div class="text-xl text-muted">Secondary</div>
                    <div class="w-8 text-xl text-center text-toned">{{ turn.secondary }}</div>
                    <UButton variant="soft" size="lg" class="w-10 justify-center" @click="subtractSecondary(1)">-1</UButton>
                    <UFieldGroup>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addSecondary(1)">1</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addSecondary(2)">2</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addSecondary(3)">3</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addSecondary(4)">4</UButton>
                        <UButton variant="soft" size="lg" class="w-10 justify-center" @click="addSecondary(5)">5</UButton>
                    </UFieldGroup>
                    
                    <div class="text-xl text-muted">CP</div>
                    <div class="w-8 text-xl text-center text-toned">{{ turn.cp }}</div>
                    <UInputNumber class="col-span-2" variant="subtle" v-model="turn.cp" :min="0"/>

                    <UFieldGroup class="col-span-2 w-full flex flex-row">
                        <UButton class="flex-1 items-center justify-center" size="lg" variant="outline" @click="cancelTurn" color="neutral">Clear</UButton>
                        <UButton class="flex-1 items-center justify-center" size="lg" variant="outline" :disabled="!canUndo" @click="undoLastTurn" color="neutral">Undo</UButton>
                    </UFieldGroup>
                    <UButton class="col-span-2 justify-center" size="lg" variant="outline" @click="commitTurn" color="success">Next Turn</UButton>
                </div>
                <div class="flex flex-row gap-4">
                </div>
                <div>
                    <UModal>
                        <UButton variant="soft" color="warning">Reset all scores</UButton>
                        <template #title>Reset Scores?</template>
                        <template #description>Are you sure you want to reset the entire match's scores?</template>
                        <template #footer="{close}">
                            <UFieldGroup>
                                <UButton variant="soft" @click="close">Close</UButton>
                                <UButton @click="() => confirmReset(close)" color="error">Reset</UButton>
                            </UFieldGroup>
                        </template>
                    </UModal>
                </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { type PlayerTurnScore, useMatch } from '../composables/useMatch';

const turn = ref<PlayerTurnScore>({
    primary: 0,
    secondary: 0,
    cp: 0
})

/** Each turn, the value of CP should just be the value from the last turn */
const InitialTurnCP = computed(() => {
    return CurrentTurn.value === 'a' ? PlayerAScore.value.cp : PlayerBScore.value.cp
})

function blankTurnScore() {
    turn.value = {primary: 0, secondary: 0, cp: InitialTurnCP.value};
}
function subtractPrimary(val: number) {
    const newVal = turn.value.primary - val;
    turn.value.primary = Math.max(newVal, 0);
}
function subtractSecondary(val: number) {
    const newVal = turn.value.secondary - val;
    turn.value.secondary = Math.max(newVal, 0);
}
function addPrimary(val: number) {
    turn.value.primary += val
}
function addSecondary(val: number) {
    turn.value.secondary += val
}
function undoLastTurn() {
    undo();
    blankTurnScore();
}
function cancelTurn() {
    blankTurnScore();
}
function commitTurn() {
    submitTurn(turn.value);
    blankTurnScore();
}

function confirmReset(closeCallback: () => void) {
    resetMatch()
    closeCallback()
}

const TitleText = computed(() => {
    if(MatchState.value === 'complete') return `Game Complete`
    return `Round ${CurrentRound.value} ${CurrentTurn.value === 'a' ? 'Top' : 'Bottom'}`
})

const { submitTurn, CurrentRound, CurrentTurn, canUndo, undo, PlayerAScore, PlayerBScore, resetMatch, MatchState } = useMatch();
</script>