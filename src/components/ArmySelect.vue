<template>
    <div class="flex flex-col gap-2">
        <FactionSelect :model-value="army.armyConfig.value.faction" @update:model-value="onFactionSelect"/>
        <DetachmentsSelect :model-value="army.armyConfig.value.detachments" @update:model-value="onDetachmentSelect" :faction="army.armyConfig.value.faction"/>
    </div>
</template>

<script setup lang="ts">
import DetachmentsSelect from './DetachmentsSelect.vue';
import { useArmy } from '../composables/useArmy.ts';

const props = defineProps<{armyKey: 'playerA'|'playerB'}>()
const army = useArmy(props.armyKey)

function onFactionSelect(f?: string | null) {
    console.log(f)
    if(!f) return army.clearFaction();
    return army.setFaction(f)
}
function onDetachmentSelect(selection: {name: string, dp: number}[]) {
    army.setDetachments(selection.map(s => s.name))
}
</script>