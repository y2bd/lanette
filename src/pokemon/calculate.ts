import typeMap from "./types";
import weaknessMap from "./weak";

interface IWeakness {
    veryWeak: string[];
    weak: string[];
    resists: string[];
    stronglyResists: string[];
    blocks: string[];
}

const defaultWeakness: () => IWeakness = () => ({
    blocks: [],
    resists: [],
    stronglyResists: [],
    veryWeak: [],
    weak: [],
});

export const typesFromPokemon = (names: Array<string | undefined>): Set<string> => {
    const pokenames = names.filter(name => name) as string[];

    const allTypes = new Set<string>();
    for (const pokename of pokenames) {
        const types = typeMap[pokename as keyof typeof typeMap];
        for (const type of types) {
            allTypes.add(type);
        }
    }

    return allTypes;
}

export const getWeakness = (pokename: string): IWeakness => {
    const [primary, secondary] = Array.from(typesFromPokemon([pokename]));

    const primaryWeakness = weaknessMap[primary as keyof typeof weaknessMap] 
        || defaultWeakness();
    const secondaryWeakness = weaknessMap[secondary as keyof typeof weaknessMap] 
        || defaultWeakness();

    const weak = primaryWeakness.weak.concat(secondaryWeakness.weak);
    const resists = primaryWeakness.resists.concat(secondaryWeakness.resists);
    const blocks = primaryWeakness.blocks.concat(secondaryWeakness.blocks);

    const multMap: { [key: string]: number } = {};
    for (const type of Object.keys(weaknessMap)) {
        multMap[type] = 1;
    }

    for (const type of weak) {
        // normally you'd use 0.5
        // but to just avoid decimals i'm using 3 instead
        // just treat 2 * 3 = 6 === 1
        // since 2 * 0.5 = 1 === 1
        multMap[type] *= 3;
    }

    for (const type of resists) {
        multMap[type] *= 2;
    }

    for (const type of blocks) {
        multMap[type] *= 0;
    }

    const finalWeakness = defaultWeakness();

    for (const type of Object.keys(multMap)) {
        switch (multMap[type]) {
            case 9:
                finalWeakness.veryWeak.push(type);
                break;
            case 3:
                finalWeakness.weak.push(type);
                break;
            case 2:
                finalWeakness.resists.push(type);
                break;
            case 4:
                finalWeakness.stronglyResists.push(type);
                break;
            case 0:
                finalWeakness.blocks.push(type);
                break;
        }
    }

    return finalWeakness;
}

export const getHoles = (names: Array<string | undefined>): { 
    dangerous: string[], 
    general: string[] 
} => {
    const pokenames = names.filter(name => name) as string[];
    const pokeWeaknesses = pokenames.map(getWeakness);

    const generalHoles = new Set<string>();
    for (const type of Object.keys(weaknessMap)) {
        generalHoles.add(type);
    }

    const dangerousHoles = new Set<string>();
    for (const weakness of pokeWeaknesses) { 
        weakness.weak.forEach(type => dangerousHoles.add(type));
        weakness.veryWeak.forEach(type => dangerousHoles.add(type));
    }
    
    // now remove any resistances or blocks
    for (const weakness of pokeWeaknesses) { 
        weakness.resists.forEach(
            type => (dangerousHoles.delete(type), generalHoles.delete(type)));
        weakness.stronglyResists.forEach(
            type => (dangerousHoles.delete(type), generalHoles.delete(type)));
        weakness.blocks.forEach(
            type => (dangerousHoles.delete(type), generalHoles.delete(type)));
    }

    return {
        dangerous: Array.from(dangerousHoles),
        
        // Remove all dangerous holes from above
        general: Array.from(generalHoles).filter(type => !dangerousHoles.has(type))
    }
}