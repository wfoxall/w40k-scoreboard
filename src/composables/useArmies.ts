import { computed } from "vue";
import data from '../assets/armies.json';
import { useStorage } from "@vueuse/core";

export interface ArmyConfig {
    superfaction: string;
    faction: string;
    detachment: string;
    icon?: string;
    colour?: string;
    painted?: boolean;
}

const armyA = useStorage<ArmyConfig>('aConfig',{superfaction: '', faction: '', detachment: '', painted: false});
const armyB = useStorage<ArmyConfig>('bConfig',{superfaction: '', faction: '', detachment: '', painted: false});
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

    function setArmyPainted(army: 'a'|'b', value: boolean) {
        if(army === 'a') armyA.value = {...armyA.value, painted: value }
        if(army === 'b') armyB.value = {...armyB.value, painted: value }
    }

    return {
        AllArmyConfigs,
        armyA,
        armyB,
        setArmyPainted
    }
}