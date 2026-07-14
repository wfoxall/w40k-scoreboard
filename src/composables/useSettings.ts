import { useStorage } from "@vueuse/core";

const scoresWidth = useStorage('scoresWidth',460)
const showBorder = useStorage('showBorder', false);
const armyHighlightStyle = useStorage<'glow'|'ring'>('armyHighlightStyle', 'glow')
const showExtraPointsIcons = useStorage('showExtraPointsIcons', true);
const detachmentsCyclePeriod = useStorage('detachmentsCyclePeriod', 5)
const maxPlayerDP = useStorage('maxPlayerDP', 3);

export function useSettings() {
    return {
        scoresWidth,
        showBorder,
        armyHighlightStyle,
        showExtraPointsIcons,
        detachmentsCyclePeriod,
        maxPlayerDP
    }
}