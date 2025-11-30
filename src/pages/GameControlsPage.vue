<template>
    <div class="px-6 py-8 space-y-4">
        <div class="col-span-2">
          <UButton
          icon="material-symbols:new-window"
            as="a"
            block
            class="cursor-pointer"
            @click="onOpenScoreboardClick"
            variant="solid"
            >Open Scoreboard</UButton
          >
        </div>
        <UTabs :items="tabItems">
            <template #setup><SetupControls/></template>
            <template #armies><ArmyControls/></template>
            <template #scores><TurnScoringControls/></template>
        </UTabs>
    </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { computed } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();

const tabItems = computed<TabsItem[]>(() =>[
    {slot: 'setup', label: 'Setup'},
    {slot: 'armies', label: 'Armies', },
    {slot: 'scores', label: 'Turn Scores', },
])

function onOpenScoreboardClick() {
  const route = router.resolve({ name: "scoreboard" });
  window.open(route.href, "_blank");
}
</script>