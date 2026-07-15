<template>
    <USelectMenu
        :items="MenuItems"
        multiple
        :disabled="!faction"
        value-key="data"
        v-model="model"
    >
        <template #item-label="{item}">{{ item.data.name }}</template>
        <template #item-leading="{item}"><UBadge size="sm" variant="soft">{{ item.data.dp }} DP</UBadge></template>
        <template #empty>Select a faction</template>
        <template #default="{modelValue}">
            <span class="h-5" v-if="modelValue?.length">{{modelValue.length}} detachments ({{ CurrentDP }} DP)</span>
            <span class="h-5" v-else>Select detachment(s)</span>
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { detachmentsForFaction } from '../config/armies';
import type { SelectMenuItem } from '@nuxt/ui';
import { useSettings } from '../composables/useSettings';

const {maxPlayerDP} = useSettings()

const props = withDefaults(defineProps<{
    faction: string | null
}>(), {faction: null})

const model = defineModel<{name: string, dp: number}[]>({default: []})

const Items = computed(() => props.faction ? detachmentsForFaction(props.faction) : [])
const MenuItems = computed<(SelectMenuItem & {data: {name:string;dp:number}})[]>(() => Items.value.map(i => ({
    label: i.name,
    data: i,
    disabled: shouldDisable(i)
})))
const CurrentDP = computed(() => model.value.reduce((accum,next) => accum + next.dp, 0))

function shouldDisable(item: {name: string; dp: number}): boolean {
    const inSelection = !!model.value.find((mv) => mv.name === item.name);
    console.log(`${item.name} in selection`, inSelection)
    const wouldExceedMaxDP = (CurrentDP.value + item.dp) > maxPlayerDP.value
    console.log(`${item.name} would exceed MaxDP`, wouldExceedMaxDP)

    return !inSelection && wouldExceedMaxDP;
}

</script>

<style scoped>

</style>