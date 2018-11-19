import * as React from 'react';
import { getHoles } from './pokemon/calculate';
import Selector from './Selector';

type PokemonName = string | undefined;

interface IPartySlot {
  index: number;
  pokemonName: PokemonName;
  setPokemonName: React.Dispatch<React.SetStateAction<PokemonName>>;
}

// custom hook!
const useSlot = (index: number): IPartySlot => {
  const [pokemonName, setPokemonName] = React.useState<PokemonName>(undefined);
  return { index, pokemonName, setPokemonName };
}

const range = [1, 2, 3, 4, 5, 6];

const App = () => {
  const slots = range.map(useSlot);

  const { dangerousHoles, generalHoles } = React.useMemo(() => {
    // tslint:disable-next-line:no-console
    console.warn("recalculating holes");

    const pokemonNames = slots.map(slot => slot.pokemonName);
    const holes = getHoles(pokemonNames);

    return {
      dangerousHoles: holes.dangerous.join(", "),
      generalHoles: holes.general.join(", "),
    };
  }, slots);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {slots.map(slot => (
        <Selector key={slot.index} index={slot.index} onSelect={slot.setPokemonName} />
      ))}
      {dangerousHoles && <p>
        <label>
          Uncovered resistances team is weak against:&nbsp;
        </label>
        <strong>{dangerousHoles}</strong>
      </p>}

      {generalHoles && <p>
        <label>
          Uncovered general resistances:&nbsp;
        </label>
        <strong>{generalHoles}</strong>
      </p>}
    </div>
  )
}

export default App;
