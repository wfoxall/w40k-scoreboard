import { useStorage } from "@vueuse/core";

const scoresWidth = useStorage('scoresWidth',460)

export function useSettings() {
    return {
        scoresWidth
    }
}