import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type UseSharedState = typeof useState;
type SetState<T> = Dispatch<SetStateAction<T>>;

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (func: any): func is Function => typeof func === 'function';

export const create = <T>() => {
  let sharedState: T;
  const setters = new Set<SetState<T>>();

  const useSharedState: UseSharedState = (initialState?: T) => {
    const [state, setState] = useState<T>(() => {
      if (!sharedState) {
        sharedState = isFunction(initialState) ? initialState() : initialState;
      }
      return sharedState;
    });

    useEffect(() => {
      setters.add(setState);
      return () => {
        setters.delete(setState);
      };
    }, [setState]);

    const setStateWrapper: SetState<T> = useCallback(newState => {
      setters.forEach(set => {
        set(prevState =>
          isFunction(newState) ? newState(prevState) : newState,
        );
      });
    }, []);

    return [state, setStateWrapper] as any;
  };

  return useSharedState;
};
