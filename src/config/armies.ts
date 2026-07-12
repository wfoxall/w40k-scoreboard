import rawJson from '../assets/armies.json';
import z from 'zod';

const zDetachmennt = z.object({
    dp: z.int().nonnegative(),
    name: z.string().nonempty()
})
export type Detachment = z.infer<typeof zDetachmennt>;

const zFaction = z.object({
    superfaction: z.string().nonempty(),
    faction: z.string().nonempty(),
    icon: z.string(),
    detachments: z.array(zDetachmennt)
})
export type Faction = z.infer<typeof zFaction>;

const zArmiesJSON = z.array(zFaction);
export type ArmiesJSON = z.infer<typeof zArmiesJSON>;

export const factions = zArmiesJSON
.parse(rawJson)
.sort((a,b) => {
    return a.superfaction.localeCompare(b.superfaction)
        || a.faction.localeCompare(b.faction)
});

export const detachmentsForFaction = (faction: string) => {
    const match = factions.find(f => f.faction === faction);
    return match ? structuredClone(match.detachments) : []
}
