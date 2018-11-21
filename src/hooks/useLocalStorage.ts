import * as React from 'react';

const useLocalStorageState = <T>(key: string, defaultValue: NonNullable<T>): [
    NonNullable<T>,
    (newValue: NonNullable<T>) => void
] => {
    const [hadRevivedValue, setHadRevivedValue] = React.useState<boolean>(false);

    let defaultVal = defaultValue;
    if (!hadRevivedValue) {
        try {
            const storedSerializedValue = window.localStorage.getItem(key);
            const storedValue: T | null = 
                storedSerializedValue && JSON.parse(storedSerializedValue);

            if (storedValue !== null) {
                defaultVal = storedValue as NonNullable<T>;
            }
        } finally {
            setHadRevivedValue(true);
        }
    }

    const [state, setState] = React.useState<NonNullable<T>>(defaultVal);
    return [
        state,
        (newValue: NonNullable<T>) => {
            setState(newValue);

            try {
                const toStore = JSON.stringify(newValue);
                window.localStorage.setItem(key, toStore);
            } catch {
                return;
            }
        }
    ]
};

export default useLocalStorageState;