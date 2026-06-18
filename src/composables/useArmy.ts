import { useStorage } from "@vueuse/core";
import { detachmentOptions, getFaction, type ArmyConfig } from "../config/armies";


export function useArmy(key: 'playerA' | 'playerB') {
    const armyConfig = useStorage<ArmyConfig>(key,{faction: '', detachments: [], battleReady: false});

    function setBattleReady(val: boolean) {
        armyConfig.value = {...armyConfig.value, battleReady: val}
    }
    function setDetachments(detachmentNames: string[]) {
        const matches = detachmentOptions.filter(d => detachmentNames.includes(d.detachment));
        const faction = getFaction(matches[0]?.faction);
        if(!matches.every(m => m.faction === faction?.faction)) {
            console.log('Selected detachments must belong to the same faction')
            clearDetachments()
        }
        armyConfig.value.faction = faction?.faction;
        armyConfig.value.icon = faction?.icon;
        armyConfig.value.detachments = matches;
    }
    function clearDetachments() {
        armyConfig.value.detachments = [];
        armyConfig.value.faction = undefined;
        armyConfig.value.icon = undefined;
    }

    return {
        armyConfig,
        setBattleReady,
        setDetachments,
        clearDetachments
    }
}