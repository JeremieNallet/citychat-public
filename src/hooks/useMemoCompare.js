import { useEffect, useRef } from "react";

// ! https://usehooks.com/useMemoCompare/

export function useMemoCompare(next, compare) {
    const previousRef = useRef();
    const previous = previousRef.current;

    const isEqual = compare(previous, next);

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = next;
        }
    });

    return isEqual ? previous : next;
}
