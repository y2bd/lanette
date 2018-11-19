import * as React from 'react';
import { getWeakness } from './pokemon/calculate';

interface IListElemProps { name: string; types: string[]; }

interface IWeaknessProps { pokemonName: string | undefined; }

const ListElem = ({ name, types }: IListElemProps) => (
    types.length <= 0 ? null : <li key={name}>{name}: {types.join(", ")}</li>
);

const WeaknessBase = ({ pokemonName }: IWeaknessProps) => {
    if (!pokemonName) {
        return null;
    }

    const weakness = getWeakness(pokemonName);

    return (<>
        <label>Defense:</label>
        <ul>
            <ListElem name="Very weak (4x)" types={weakness.veryWeak} />
            <ListElem name="Weak (2x)" types={weakness.weak} />
            <ListElem name="Resists (0.5x)" types={weakness.resists} />
            <ListElem name="Strongly resists (0.25x)" types={weakness.stronglyResists} />
            <ListElem name="Blocks (0x)" types={weakness.blocks} />
        </ul>
    </>);
}

const Weakness = React.memo(WeaknessBase);
export default Weakness;