import {createRouter, createWebHashHistory} from 'vue-router';
import ScoreboardPage from './pages/ScoreboardPage.vue';
import GameControlsPage from './pages/GameControlsPage.vue';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {name: 'scoreboard', component: ScoreboardPage, path: '/scores'},
        {name: 'controls', component: GameControlsPage, path: '/'},
    ]
})