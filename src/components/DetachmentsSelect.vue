<template>
    <USelectMenu
        :items="Items"
        multiple
        :disabled="!faction"
        v-model="model"
    >
        <template #item-label="{item}">{{ item.name }}</template>
        <template #item-leading="{item}"><UBadge size="sm" variant="soft">{{ item.dp }} DP</UBadge></template>
        <template #empty>Select a faction</template>
        <template #default="{modelValue}">
            <span class="h-5" v-if="modelValue?.length">{{modelValue.length}} detachments</span>
            <span class="h-5" v-else>Select detachment(s)</span>
        </template>
    </USelectMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { detachmentsForFaction } from '../config/armies';

const props = withDefaults(defineProps<{
    faction: string | null
}>(), {faction: null})

const model = defineModel<{name: string, dp: number}[]>({default: () => []})

const Items = computed(() => props.faction ? detachmentsForFaction(props.faction) : [])

</script>

<style scoped>

</style>