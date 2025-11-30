import { useStorage } from "@vueuse/core";

const scoresWidth = useStorage('scoresWidth',460)
const showBorder = useStorage('showBorder', false);

export function useSettings() {
    return {
        scoresWidth,
        showBorder,
    }
}