import factions from '../assets/armies.json';
export interface ArmyConfig {
    faction?: string;
    detachments: DetatchmentOption[];
    icon?: string;
    colour?: string;
    battleReady?: boolean;
}

export interface DetatchmentOption {
    superfaction: string;
    faction: string;
    detachment: string;
    dp: number;
}

export const detachmentOptions = factions
    .flatMap(f => f
        .detachments
        .flatMap(d => ({
            superfaction: f.superfaction, 
            faction: f.faction,
            detachment: d.name,
            dp: d.dp
        } satisfies DetatchmentOption))
    );

// export const factionOptions = factions.map(f => ({label: f.faction, description: f.superfaction, icon: f.icon}))
    
export function getFaction(name?: string): typeof factions[number] | null {
    return factions.find(f => f.faction === name) ?? null;
}
export {factions}