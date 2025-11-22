import { computed } from "vue";
// import { Armies, type ArmyConfig, type ArmyKey, type FactionName } from "./armies";
import data from '../assets/armies.json';
import { useStorage } from "@vueuse/core";

export interface ArmyConfig {
    superfaction: string;
    faction: string;
    detachment: string;
    icon?: string;
    colour?: string;
}

const armyA = useStorage<ArmyConfig>('aConfig',{superfaction: '', faction: '', detachment: ''});
const armyB = useStorage<ArmyConfig>('bConfig',{superfaction: '', faction: '', detachment: ''});
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

    return {
        AllArmyConfigs,
        armyA,
        armyB,
    }
}