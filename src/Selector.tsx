import * as React from 'react';
import useLocalStorageState from './hooks/useLocalStorage';
import typeMap from "./pokemon/types"
import './Selector.css';
import Weakness from './Weakness';

interface ISelectorProps {
    index: number;
    onSelect(pokemonName: string): void;
}

const typeMapKeys = Object.keys(typeMap);
const undefinedString = 'undefined';

const SelectorBase = ({ index, onSelect }: ISelectorProps) => {
    const [poke, setPoke] = useLocalStorageState(`poke${index}`, undefinedString as string);
    React.useEffect(() => {
        // if it's mount-time and there's already a pokemon, make sure to tell up stream.
        if (poke !== undefinedString) {
            onSelect(poke);
        }
    }, []);

    const onChange = React.useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
        setPoke(evt.target.value);
        onSelect(evt.target.value);
    }, [onSelect]);

    const typeString = React.useMemo(() => {
        const types = typeMap[poke as keyof typeof typeMap];
        return types && types.join(", ");
    }, [poke])

    const selectedPoke = poke !== undefinedString ? poke : "";

    return (
        <div className='Selector'>
            <label className='Header'>{selectedPoke || `Pokemon ${index}`}</label>
            <select onChange={onChange} defaultValue={selectedPoke}>
                <option disabled={true} value="">Choose an option...</option>
                {typeMapKeys.map(pokename => (
                    <option key={pokename} value={pokename}>{pokename}</option>
                ))}
            </select>
            {typeString && <p>Types: {typeString}</p>}
            <Weakness pokemonName={selectedPoke} />
        </div>
    );
};

const Selector = React.memo(SelectorBase);
export default Selector;