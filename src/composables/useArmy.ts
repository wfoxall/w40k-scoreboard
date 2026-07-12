import { useStorage } from "@vueuse/core";
import { factions } from "../config/armies";
import { computed } from "vue";

export interface ArmyConfig {
    faction: string | null;
    detachments: {name: string, dp: number}[];
    icon?: string;
    battleReady?: boolean;
}

export function useArmy(key: 'playerA' | 'playerB') {
    const armyConfig = useStorage<ArmyConfig>(
        key,
        {
            faction: null,
            detachments: [],
            battleReady: false,
        },
        localStorage,
        {mergeDefaults: true}
    );

    const Faction = computed(() => {
        const match = factions.find(f => f.faction === armyConfig.value.faction);
        return match ?? null;
    })
    const Detachments = computed(() => {
        return structuredClone(armyConfig.value.detachments);
    })
    const CurrentDP = computed(() => {
        return Detachments.value.reduce((accum,next) => {return accum + next.dp}, 0)
    })
    
    function setFaction(factionName: string) {
        console.log(factionName)
        const match = factions.find(f => f.faction === factionName);
        if(!match) return clearFaction();
        armyConfig.value.faction = match.faction;
        armyConfig.value.detachments = [];
        armyConfig.value.icon = match.icon;
    }
    function setDetachments(detachments: string[]) {
        const matches = Faction.value?.detachments.filter(d => detachments.includes(d.name));
        armyConfig.value.detachments = [...(matches ?? [])]
    }
    function clearFaction() {
        armyConfig.value = {...armyConfig.value, faction: '', detachments: [], icon: undefined}
    }
    function setBattleReady(val: boolean) {
        armyConfig.value = {...armyConfig.value, battleReady: val}
    }

    return {
        Faction,
        Detachments,
        CurrentDP,
        armyConfig,
        setFaction,
        setDetachments,
        clearFaction,
        setBattleReady,
    }
}