<template>
    <div 
        class="relative bg-muted px-4 py-2 rounded-lg "
        :class="{
            'ring-2': UseRing,
            'ring-primary': UseRing,
            'ring-success': UseRing && state === 'win'
        }">
        <GlowBorder v-if="UseGlow" :duration="state === 'win' ? 8 : 30" :color="state === 'win' ? ['var(--color-primary)','var(--color-secondary)'] : undefined"/>
        <div class="grid grid-cols-[auto_max-content] grid-rows-[repeat(3,1fr)_auto] items-center grid-flow-col gap-x-4 gap-y-1">
            <!-- <div v-if="(config?.detachments ?? []).length > 1">
                <MorphingText :texts="(config?.detachments ?? []).map(d => d.name)"/>
            </div> -->
            <div v-if="Detachments.length > 1" class="self-start">
                <TransitionGroup name="slide" tag="div" class="relative self-start">
                    <div :key="detachmentIdx" class="slide-item">{{ DisplayedDetachment }}</div>
                </TransitionGroup>
            </div>
            <div v-else>{{ DisplayedDetachment }}</div>
            <!-- <div v-else class="overflow-hidden grid grid-rows-subgrid">
                <div class="text-muted">{{ Detachments.length }} detachments</div>
            </div> -->
            <div class="text-muted">{{ Faction }}</div>
            <div v-if="Detachments.length > 1" class="text-muted">{{ Detachments.length }} detachments</div>
            <div v-else></div>
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
import { computed, ref, watch } from 'vue';
import type { PlayerScore } from '../composables/useMatch';
import NumberTicker from '../lib/number-ticker/NumberTicker.vue';
import GlowBorder from '../lib/glow-border/GlowBorder.vue';
import {useSettings} from '../composables/useSettings'
import type { ArmyConfig } from '../composables/useArmy.ts';

const {armyHighlightStyle, showExtraPointsIcons, detachmentsCyclePeriod} = useSettings();

const props = withDefaults(defineProps<{
    score: PlayerScore,
    config?: ArmyConfig|null,
    state?: null|'turn'|'win'
}>(),{config: null, state: null})

const Detachments = computed(() => props.config?.detachments.map(d => d.name) ?? [])
const Faction = computed(() => props.config?.faction ?? '----')
// const Superfaction = computed(() => props.config?.faction === props.config?.superfaction ? undefined : props.config?.superfaction ?? '----')
const Total = computed(() => props.score.primary + props.score.secondary + props.score.extra.battleReady)
const Avatar = computed(() => props.config?.icon ? `./avatars/${props.config.icon}` : undefined)
const Initials = computed(() => {
    if(!props.config?.faction) return '?'
    return props.config.faction.split(' ').map((word) => word.charAt(0)).join('') ?? '?'
})
const UseRing = computed(() => armyHighlightStyle.value === 'ring' && ((props.state === 'turn') || (props.state === 'win')))
const UseGlow = computed(() => armyHighlightStyle.value === 'glow' && ((props.state === 'turn') || (props.state === 'win')))

const detachmentIdx = ref(0);
const DisplayedDetachment = computed(() => Detachments.value[detachmentIdx.value])
let detachmentInterval: number;

function setupInterval() {
    window.clearInterval(detachmentInterval)
    detachmentInterval = window.setInterval(() => {
        detachmentIdx.value = (detachmentIdx.value + 1) % Detachments.value.length
    }, detachmentsCyclePeriod.value * 1000)
}

watch([Faction,Detachments,detachmentsCyclePeriod], () => {setupInterval()}, {immediate: true, deep: true});


</script>

<style lang="css" scoped>
.slider {
  position: relative;
  height: 1.5em;
  overflow: hidden;
}

.slide-item {
  position: absolute;
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-enter-from {
  transform: translateY(50%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-50%);
  opacity: 0;
}
</style>