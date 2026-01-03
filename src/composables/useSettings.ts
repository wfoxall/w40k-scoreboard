import { useStorage } from "@vueuse/core";

const scoresWidth = useStorage('scoresWidth',460)
const showBorder = useStorage('showBorder', false);
const armyHighlightStyle = useStorage<'glow'|'ring'>('armyHighlightStyle', 'glow')
const showExtraPointsIcons = useStorage('showExtraPointsIcons', true);

export function useSettings() {
    return {
        scoresWidth,
        showBorder,
        armyHighlightStyle,
        showExtraPointsIcons
    }
}