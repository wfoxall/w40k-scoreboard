import { useRefHistory, useStorage } from "@vueuse/core";
import { computed } from "vue";

export interface PlayerTurnScore {
    primary: number;
    secondary: number;
    cp: number;
}

const turnScores = useStorage<PlayerTurnScore[]>('turnScores', [])
const {undo, redo, canUndo, canRedo} = useRefHistory(turnScores, {deep: true})

export function useMatch() {

    function submitTurn(score: PlayerTurnScore) {
        if(turnScores.value.length >= 10) return;
        turnScores.value.push(score);
    }

    function resetMatch() {
        turnScores.value = [];
    }

    const OddTurnScores = computed(() => {
        return turnScores.value.filter((_,idx) => idx % 2 === 0)
    })
    const EvenTurnScores = computed(() => {
        return turnScores.value.filter((_,idx) => idx % 2 === 1)
    })

    /**
     * Accumulates an array of turn scores to calculate a player's current scores
     * - Primary and secondary scores are summed.
     * - CP is the last value in the array.
     */
    function calculateCurrentScore(playerScores: PlayerTurnScore[]): PlayerTurnScore {
        return playerScores.reduce<PlayerTurnScore>((accum, current) => {
            return {
                primary: accum.primary += current.primary,
                secondary: accum.secondary += current.secondary,
                cp: current.cp
            }
        },{primary: 0, secondary: 0, cp: 0})
    }


    const PlayerAScore = computed(() => {
        return calculateCurrentScore(OddTurnScores.value)
    })
    const PlayerBScore = computed(() => {
        return calculateCurrentScore(EvenTurnScores.value)
    })

    const CurrentRound = computed(() => {
        if(turnScores.value.length >= 10) return;
        return Math.floor(turnScores.value.length / 2) + 1;
    })
    const CurrentTurn = computed<'a'|'b'|'done'>(() => {
        if(turnScores.value.length === 10) return 'done'
        return turnScores.value.length % 2 === 0 ? 'a' : 'b';
    })
    const MatchState = computed(() => {
        if(turnScores.value.length >= 10) return 'complete'
        return 'in-game'
    })
    
    return {
        undo,
        redo,
        canUndo,
        canRedo,
        /** Submit score for next player turn */
        submitTurn: submitTurn,
        /** Delete all turn scores and reset the turn to the start of the game */
        resetMatch,
        /** Current score for player A (who played first) */
        PlayerAScore,
        /** Current score for player B (who played second) */
        PlayerBScore,
        /** What round number is it? */
        CurrentRound,
        /** Whose turn is it. Player A, player B or is the game complete? */
        CurrentTurn,
        /** What point of the match we are in */
        MatchState,
    }
}
