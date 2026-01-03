import { useRefHistory, useStorage } from "@vueuse/core";
import { computed } from "vue";
import { useArmies } from "./useArmies";

export interface PlayerTurnScore {
    primary: number;
    secondary: number;
    cp: number;
}
export interface PlayerExtraPoints {
    painted: number;
}

export interface PlayerScore {
    primary: number;
    secondary: number;
    cp: number;
    extra: PlayerExtraPoints;
}

const turnScores = useStorage<PlayerTurnScore[]>('turnScores', [])
const {undo, redo, canUndo, canRedo} = useRefHistory(turnScores, {deep: true})

export function useMatch() {

    const {armyA,armyB} = useArmies();

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
    function calculateCurrentTurnScore(playerTurnScores: PlayerTurnScore[]): PlayerTurnScore {
        return playerTurnScores.reduce<PlayerTurnScore>((accum, current) => {
            return {
                primary: accum.primary += current.primary,
                secondary: accum.secondary += current.secondary,
                cp: current.cp
            }
        },{primary: 0, secondary: 0, cp: 0})
    }


    const PlayerAScore = computed<PlayerScore>(() => {
        const turnScores = calculateCurrentTurnScore(OddTurnScores.value)
        const extraPoints: PlayerExtraPoints = {painted: armyA.value.painted ? 10 : 0}
        return {...turnScores, extra: {...extraPoints}};
    })
    const PlayerBScore = computed<PlayerScore>(() => {
        const turnScores = calculateCurrentTurnScore(EvenTurnScores.value)
        const extraPoints: PlayerExtraPoints = {painted: armyB.value.painted ? 10 : 0}
        return {...turnScores, extra: {...extraPoints}};
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
        submitTurn,
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
