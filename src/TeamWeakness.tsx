import * as React from 'react';
import { getHoles } from './pokemon/calculate';

interface ITeamWeaknessProps {
    pokemonNames: Array<string | undefined>;
}

const TeamWeaknessBase = ({ pokemonNames }: ITeamWeaknessProps) => {
    const { absoluteHoles, dangerousHoles, generalHoles } = React.useMemo(() => {
        const holes = getHoles(pokemonNames);

        return {
            absoluteHoles: holes.absolute.join(", "),
            dangerousHoles: holes.dangerous.join(", "),
            generalHoles: holes.general.join(", "),
        };
    }, [pokemonNames]);

    return (<>
        {absoluteHoles && <p>
            <label>
                Types all team members are weak against:&nbsp;
            </label>
            <strong>{absoluteHoles}</strong>
        </p>}

        {dangerousHoles && <p>
            <label>
                Types some team members are weak against with no resistances:&nbsp;
            </label>
            <strong>{dangerousHoles}</strong>
        </p>}

        {generalHoles && <p>
            <label>
                Types no team members have resistances for:&nbsp;
            </label>
            <strong>{generalHoles}</strong>
        </p>}
    </>)
};

const TeamWeakness = React.memo(TeamWeaknessBase);
export default TeamWeakness;