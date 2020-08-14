import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseSharedState = typeof useState;

export const create = <T>() => {
  let sharedState: T;
  const setters = new Set<Dispatch<SetStateAction<T>>>();

  const useSharedState: UseSharedState = (initialState?: T) => {
    const [state, setState] = useState<T>(() => {
      if (!sharedState) {
        sharedState =
          typeof initialState === 'function' ? initialState() : initialState;
      }
      return sharedState;
    });

    useEffect(() => {
      setters.add(setState);
      return () => {
        setters.delete(setState);
      };
    }, [setState]);

    useEffect(() => {
      sharedState = state;
      setters.forEach(set => {
        if (set !== setState) {
          set(sharedState);
        }
      });
    }, [state]);

    return [state, setState] as any;
  };

  return useSharedState;
};
