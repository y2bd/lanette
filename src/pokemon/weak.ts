// tslint:disable:object-literal-sort-keys

const weaknesses: { [key: string]: Record<"weak" | "resists" | "blocks", string[]> } = {
    Bug: {
        weak: [
            "Fire",
            "Flying",
            "Rock"
        ],
        resists: [
            "Fighting",
            "Grass",
            "Ground"
        ],
        blocks: []
    },
    Dark: {
        weak: [
            "Bug",
            "Fairy",
            "Fighting"
        ],
        resists: [
            "Dark",
            "Ghost"
        ],
        blocks: [
            "Psychic"
        ]
    },
    Dragon: {
        weak: [
            "Dragon",
            "Fairy",
            "Ice"
        ],
        resists: [
            "Electric",
            "Fire",
            "Grass",
            "Water"
        ],
        blocks: []
    },
    Electric: {
        weak: [
            "Ground"
        ],
        resists: [
            "Electric",
            "Flying",
            "Steel"
        ],
        blocks: []
    },
    Fairy: {
        weak: [
            "Poison",
            "Steel"
        ],
        resists: [
            "Bug",
            "Dark",
            "Fighting"
        ],
        blocks: [
            "Dragon"
        ]
    },
    Fighting: {
        weak: [
            "Fairy",
            "Flying",
            "Psychic"
        ],
        resists: [
            "Bug",
            "Dark",
            "Rock"
        ],
        blocks: []
    },
    Fire: {
        weak: [
            "Ground",
            "Rock",
            "Water"
        ],
        resists: [
            "Bug",
            "Fairy",
            "Fire",
            "Grass",
            "Ice",
            "Steel"
        ],
        blocks: []
    },
    Flying: {
        weak: [
            "Electric",
            "Ice",
            "Rock"
        ],
        resists: [
            "Bug",
            "Fighting",
            "Grass"
        ],
        blocks: [
            "Ground"
        ]
    },
    Ghost: {
        weak: [
            "Dark",
            "Ghost"
        ],
        resists: [
            "Bug",
            "Poison"
        ],
        blocks: [
            "Fighting",
            "Normal"
        ]
    },
    Grass: {
        weak: [
            "Bug",
            "Fire",
            "Flying",
            "Ice",
            "Poison"
        ],
        resists: [
            "Electric",
            "Grass",
            "Ground",
            "Water"
        ],
        blocks: []
    },
    Ground: {
        weak: [
            "Grass",
            "Ice",
            "Water"
        ],
        resists: [
            "Poison",
            "Rock"
        ],
        blocks: [
            "Electric"
        ]
    },
    Ice: {
        weak: [
            "Fighting",
            "Fire",
            "Rock",
            "Steel"
        ],
        resists: [
            "Ice"
        ],
        blocks: []
    },
    Normal: {
        weak: [
            "Fighting"
        ],
        resists: [],
        blocks: [
            "Ghost"
        ]
    },
    Poison: {
        weak: [
            "Ground",
            "Psychic"
        ],
        resists: [
            "Bug",
            "Fairy",
            "Fighting",
            "Grass",
            "Poison"
        ],
        blocks: []
    },
    Psychic: {
        weak: [
            "Bug",
            "Dark",
            "Ghost"
        ],
        resists: [
            "Fighting",
            "Psychic"
        ],
        blocks: []
    },
    Rock: {
        weak: [
            "Fighting",
            "Grass",
            "Ground",
            "Steel",
            "Water"
        ],
        resists: [
            "Fire",
            "Flying",
            "Normal",
            "Poison"
        ],
        blocks: []
    },
    Steel: {
        weak: [
            "Fighting",
            "Fire",
            "Ground"
        ],
        resists: [
            "Bug",
            "Dragon",
            "Fairy",
            "Flying",
            "Grass",
            "Ice",
            "Normal",
            "Psychic",
            "Rock",
            "Steel"
        ],
        blocks: [
            "Poison"
        ]
    },
    Water: {
        weak: [
            "Electric",
            "Grass"
        ],
        resists: [
            "Fire",
            "Ice",
            "Steel",
            "Water"
        ],
        blocks: []
    }
};

export default weaknesses;