<template>
    <div 
        class="relative bg-muted px-4 py-2 rounded-lg "
        :class="{
            'ring-2': UseRing,
            'ring-primary': UseRing,
            'ring-success': UseRing && state === 'win'
        }">
        <GlowBorder v-if="UseGlow" :duration="state === 'win' ? 8 : 30" :color="state === 'win' ? ['var(--color-primary)','var(--color-secondary)'] : undefined"/>
        <div class="grid grid-cols-[auto_max-content] grid-rows-[repeat(3,auto)_auto] items-center grid-flow-col gap-x-4 gap-y-1">
            <div>{{ Detachment }}</div>
            <div>{{ Faction }}</div>
            <div class="text-muted">
                <span v-if="Superfaction">
                    {{ Superfaction }}
                </span>
            </div>
            <div class="h-full grid grid-cols-[repeat(6,minmax(0,max-content))_auto] gap-4 border-t border-muted items-center w-full">
                <div class="text-base text-muted">Pri</div>
                <NumberTicker class="text-default text-base" :value="score.primary" :decimal-places="0"></NumberTicker>
                <div class="text-base text-muted">Sec</div>
                <NumberTicker class="text-default text-base" :value="score.secondary" :decimal-places="0"></NumberTicker>
                <div class="text-base text-muted">CP</div>
                <NumberTicker class="text-default text-base" :value="score.cp" :decimal-places="0"></NumberTicker>
                <div v-show="showExtraPointsIcons" class="text-muted min-w-5 flex justify-self-end justify-center">
                    <UIcon v-if="config?.battleReady" name="mdi:paint-outline"/>
                </div>
            </div>
            <div class=" px-3 row-span-2 justify-self-center">
                <UAvatar class="bg-accented" size="3xl" :text="Initials" :src="Avatar"/>
            </div>
            <div class="justify-self-center text-muted">Total</div>
            <div class="justify-self-center"><NumberTicker class="text-default text-2xl" :value="Total" :decimal-places="0"></NumberTicker></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PlayerScore } from '../composables/useMatch';
import NumberTicker from '../lib/number-ticker/NumberTicker.vue';
import type { ArmyConfig } from '../composables/useArmies';
import GlowBorder from '../lib/glow-border/GlowBorder.vue';
import {useSettings} from '../composables/useSettings'

const {armyHighlightStyle, showExtraPointsIcons} = useSettings();
const props = withDefaults(defineProps<{
    score: PlayerScore,
    config?: ArmyConfig|null,
    state?: null|'turn'|'win'
}>(),{config: null, state: null})
const Detachment = computed(() => `${props.config?.detachment ?? 'Anonymous Detachment'}`)
const Faction = computed(() => props.config?.faction ?? '----')
const Superfaction = computed(() => props.config?.faction === props.config?.superfaction ? undefined : props.config?.superfaction ?? '----')
const Total = computed(() => props.score.primary + props.score.secondary + props.score.extra.battleReady)
const Avatar = computed(() => props.config?.icon ? `./avatars/${props.config.icon}` : undefined)
const Initials = computed(() => {
    if(!props.config?.superfaction) return '?'
    return props.config.superfaction.split(' ').map((word) => word.charAt(0)).join('') ?? '?'
})
const UseRing = computed(() => armyHighlightStyle.value === 'ring' && ((props.state === 'turn') || (props.state === 'win')))
const UseGlow = computed(() => armyHighlightStyle.value === 'glow' && ((props.state === 'turn') || (props.state === 'win')))
</script>