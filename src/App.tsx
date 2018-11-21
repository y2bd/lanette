import * as React from 'react';
import './App.css';
import Selector from './Selector';
import TeamWeakness from './TeamWeakness';

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

  return (
    <div className='App'>
      <div className='Selectors'>
        {slots.map(slot => (
          <Selector key={slot.index} index={slot.index} onSelect={slot.setPokemonName} />
        ))}
      </div>
      <TeamWeakness pokemonNames={slots.map(slot => slot.pokemonName)} />
    </div>
  )
}

export default App;
