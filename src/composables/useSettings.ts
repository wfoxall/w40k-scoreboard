import { useStorage } from "@vueuse/core";

const scoresWidth = useStorage('scoresWidth',460)
const showBorder = useStorage('showBorder', false);
const armyHighlightStyle = useStorage<'glow'|'ring'>('armyHighlightStyle', 'glow')

export function useSettings() {
    return {
        scoresWidth,
        showBorder,
        armyHighlightStyle
    }
}