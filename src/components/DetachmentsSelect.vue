<template>
    <USelectMenu
        v-model="model"
        :items="FilteredDetachments"
        multiple
        value-key="detachment"
        :disabled="!faction"
    >
        <template #item-label="{item}">{{ item.detachment }}</template>
        <template #item-leading="{item}"><UBadge size="sm" variant="soft">{{ item.dp }} DP</UBadge></template>
        <template #empty>Select a faction</template>
        <template #default="{modelValue}">
            <span class="h-5" v-if="modelValue?.length">{{modelValue.length}} detachments</span>
            <span class="h-5" v-else>Select detachment(s)</span>
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { detachmentOptions, type DetatchmentOption } from '../config/armies';

const MAX_DP = 3;

const props = defineProps<{
    faction?: string
}>()

watch(() => props.faction, () => model.value = [])

const FilteredDetachments = computed(() => {
    return detachmentOptions.filter(d => d.faction === props.faction).map((d) => ({...d, disabled: shouldDisable(d)}))
})
const CurrentDetachments = computed(() => detachmentOptions.filter(d => model.value?.includes(d.detachment)))
const CurrentDP = computed(() => CurrentDetachments.value.reduce((sum,d) => sum+d.dp,0))
const model = defineModel<string[]>()

function shouldDisable(d: DetatchmentOption): boolean {
    // Don't disable if it's already in the selection. It needs to be enabled so we can deselect it.
    if(!!(model.value ?? []).find(s => s === d.detachment)) return false;
    // Disable it if it'd take the total DP over the limit
    if(CurrentDP.value + d.dp > MAX_DP) return true;
    // Otherwise return false (not disabled)
    return false;
}

</script>

<style scoped>

</style>