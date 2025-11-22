<template>
    <div class="bg-muted px-4 py-2 rounded-lg ring-2 ring-primary" :class="{'ring-transparent': !highlight}">
        <div class="flex flex-row w-full gap-6 items-center">
            <div class="h-full w-12 aspect-square flex justify-center items-center">
                <UAvatar class="bg-accented" size="3xl" text="T" :src="Avatar"/>
            </div>
            <div class="flex-auto flex flex-col gap-y-1">
                <div class="text-lg">{{ Detachment }}</div>
                <div class="flex gap-x-2 flex-wrap text-sm text-muted">
                    <span>
                        {{ Faction }}
                    </span>
                    <span v-if="Superfaction">
                        ({{ Superfaction }})
                    </span>
                </div>
                <div class="grid grid-cols-3 gap-x-6 border-t border-accented">
                    <div class="w-full flex justify-between items-center gap-x-2">
                        <div class="text-xl text-muted">Pri.</div>
                        <NumberTicker class="text-default" :value="score.primary" :decimal-places="0"></NumberTicker>
                    </div>
                    <div class="w-full flex justify-between items-center gap-x-2">
                        <div class="text-xl text-muted">Sec.</div>
                        <NumberTicker class="text-default" :value="score.secondary" :decimal-places="0"></NumberTicker>
                    </div>
                    <div class="w-full flex justify-between items-center gap-x-2">
                        <div class="text-xl text-muted">CP</div>
                        <NumberTicker class="text-default" :value="score.cp" :decimal-places="0"></NumberTicker>
                    </div>
                </div>
            </div>
            <div class="h-full w-12 aspect-square flex flex-col justify-center items-center">
                <div class="text-lg text-muted">Total</div>
                <NumberTicker class="text-default text-2xl" :value="Total" :decimal-places="0"></NumberTicker>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PlayerTurnScore } from '../composables/useMatch';
import NumberTicker from '../lib/number-ticker/NumberTicker.vue';
import type { ArmyConfig } from '../composables/useArmies';

const props = defineProps<{
    score: PlayerTurnScore,
    config?: ArmyConfig|null,
    highlight: boolean
}>()
const Detachment = computed(() => `${props.config?.detachment ?? 'Anonymous Detachment'}`)
const Faction = computed(() => props.config?.faction ?? '----')
const Superfaction = computed(() => props.config?.faction === props.config?.superfaction ? undefined : props.config?.superfaction ?? '----')
const Total = computed(() => props.score.primary + props.score.secondary)
const Avatar = computed(() => props.config?.icon ? `/avatars/${props.config.icon}` : undefined)
</script>