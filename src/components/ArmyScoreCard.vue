<template>
    <div 
        class="relative bg-muted px-4 py-2 rounded-lg "
        :class="{
            'ring-2': UseRing,
            'ring-primary': UseRing,
            'ring-success': UseRing && state === 'win'
        }">
        <GlowBorder v-if="UseGlow" :duration="state === 'win' ? 8 : 30" :color="state === 'win' ? ['var(--color-primary)','var(--color-secondary)'] : undefined"/>
        <div class="grid grid-cols-[auto_auto] grid-rows-[repeat(3,auto)_auto] items-center grid-flow-col gap-x-6 gap-y-1">
            <div>{{ Detachment }}</div>
            <div>{{ Faction }}</div>
            <div class="text-muted">
                <span v-if="Superfaction">
                    {{ Superfaction }}
                </span>
            </div>
            <div class="h-full grid grid-cols-[repeat(6,minmax(0,max-content))] gap-6 border-t border-muted items-center">
                <div class="text-base text-muted">Pri</div>
                <NumberTicker class="text-default text-base" :value="score.primary" :decimal-places="0"></NumberTicker>
                <div class="text-base text-muted">Sec</div>
                <NumberTicker class="text-default text-base" :value="score.secondary" :decimal-places="0"></NumberTicker>
                <div class="text-base text-muted">CP</div>
                <NumberTicker class="text-default text-base" :value="score.cp" :decimal-places="0"></NumberTicker>
            </div>
            <div class="row-span-2 justify-self-center">
                <UAvatar class="bg-accented" size="3xl" text="T" :src="Avatar"/>
            </div>
            <div class="justify-self-center text-muted">Total</div>
            <div class="justify-self-center"><NumberTicker class="text-default text-2xl" :value="Total" :decimal-places="0"></NumberTicker></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PlayerTurnScore } from '../composables/useMatch';
import NumberTicker from '../lib/number-ticker/NumberTicker.vue';
import type { ArmyConfig } from '../composables/useArmies';
import GlowBorder from '../lib/glow-border/GlowBorder.vue';
import {useSettings} from '../composables/useSettings'

const {armyHighlightStyle} = useSettings();
const props = withDefaults(defineProps<{
    score: PlayerTurnScore,
    config?: ArmyConfig|null,
    state?: null|'turn'|'win'
}>(),{config: null, state: null})
const Detachment = computed(() => `${props.config?.detachment ?? 'Anonymous Detachment'}`)
const Faction = computed(() => props.config?.faction ?? '----')
const Superfaction = computed(() => props.config?.faction === props.config?.superfaction ? undefined : props.config?.superfaction ?? '----')
const Total = computed(() => props.score.primary + props.score.secondary)
const Avatar = computed(() => props.config?.icon ? `./avatars/${props.config.icon}` : undefined)

const UseRing = computed(() => armyHighlightStyle.value === 'ring' && ((props.state === 'turn') || (props.state === 'win')))
const UseGlow = computed(() => armyHighlightStyle.value === 'glow' && ((props.state === 'turn') || (props.state === 'win')))
</script>