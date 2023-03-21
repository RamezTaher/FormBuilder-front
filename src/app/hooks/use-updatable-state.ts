import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function useUpdatableState<T>(value: T, predicate: StateComparator<T> = defaultComparator): UpdatableResult<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stateArray: UpdatableResult<T> = useState(value) as any;
    const previousValueRef = useRef(value);
    const [isChanged, setChanged] = useState(true);

    useEffect(() => {
        previousValueRef.current = value;
    });

    if (!predicate(value, previousValueRef.current) && !predicate(value, stateArray[0])) {
        setChanged(true);
        stateArray[1](value);
    } else {
        if (isChanged) {
            setChanged(false);
        }
    }
    stateArray[2] = isChanged;
    return stateArray;
}

export default useUpdatableState;

const defaultComparator = <T>(a: T, b: T) => a === b;

export interface StateComparator<T> {
    (_a: T | undefined, _b: T | undefined): boolean;
}

export type UpdatableResult<T> = [T, Dispatch<SetStateAction<T>>, boolean];
