import { computed } from "vue";
import data from '../assets/armies.json';
import { useStorage } from "@vueuse/core";

export interface ArmyConfig {
    superfaction: string;
    faction: string;
    detachment: string;
    icon?: string;
    colour?: string;
    battleReady?: boolean;
}

const armyA = useStorage<ArmyConfig>('aConfig',{superfaction: '', faction: '', detachment: '', battleReady: false});
const armyB = useStorage<ArmyConfig>('bConfig',{superfaction: '', faction: '', detachment: '', battleReady: false});
export function useArmies() {

    const AllArmyConfigs = computed(() => {
        return data.flatMap<ArmyConfig>(faction => {
            const {detachments, ...rest} = faction;
            return detachments.map<ArmyConfig>(detachment=> ({
                detachment,
                ...rest
            }))
        })
    })

    function setArmyBattleReady(army: 'a'|'b', value: boolean) {
        if(army === 'a') armyA.value = {...armyA.value, battleReady: value }
        if(army === 'b') armyB.value = {...armyB.value, battleReady: value }
    }

    return {
        AllArmyConfigs,
        armyA,
        armyB,
        setArmyBattleReady
    }
}