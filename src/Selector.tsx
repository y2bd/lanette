import * as React from 'react';
import typeMap from "./pokemon/types"
import Weakness from './Weakness';

interface ISelectorProps {
    index: number;
    onSelect(pokemonName: string): void;
}

const typeMapKeys = Object.keys(typeMap);

const SelectorBase = ({ index, onSelect }: ISelectorProps) => {
    const [poke, setPoke] = React.useState<string | undefined>(undefined);

    const onChange = React.useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
        setPoke(evt.target.value);
        onSelect(evt.target.value);
    }, [onSelect]);

    const typeString = React.useMemo(() => {
        const types = typeMap[poke as keyof typeof typeMap];
        return types && types.join(", ");
    }, [poke])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Choose Pokemon #{index}:</label>
            <select onChange={onChange} defaultValue="">
                <option disabled={true} value="">Choose an option...</option>
                {typeMapKeys.map(pokename => (
                    <option key={pokename} value={pokename}>{pokename}</option>
                ))}
            </select>
            {typeString && <p>Types: {typeString}</p>}
            <Weakness pokemonName={poke} />
        </div>
    );
};

const Selector = React.memo(SelectorBase);
export default Selector;