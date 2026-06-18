<template>
    <div class="flex flex-col gap-2">
        <FactionSelect v-model="faction"/>
        <DetachmentsSelect v-model="detachments" :faction="faction"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import DetachmentsSelect from './DetachmentsSelect.vue';
import { detachmentOptions, type DetatchmentOption } from '../config/armies.ts';

const faction = ref<string>()
const detachments = ref<string[]>()

const detachmentsModel = defineModel<DetatchmentOption[]>('detachments')
// const factionModel = defineModel<string>('faction')

onMounted(() => {
    detachments.value = detachmentsModel.value?.map(d => d.detachment)
    faction.value = detachmentsModel.value?.[0]?.faction
})

watch(faction, (newFaction,oldFaction) => {
    if(newFaction !== oldFaction) {
        detachmentsModel.value = [];
    }
})
watch(detachments, (newDetachments,oldDetachments) => {
    detachmentsModel.value = detachmentOptions.filter(d => {
        return newDetachments?.includes(d.detachment) && d.faction === faction.value
    });
})

</script>