## create-shared-state

A hook that has the exact same API as `useState` but the state can be shared between components instead.

## Motivation
Most of the state management tools out there force you to create and initialize your shared state **outside** components and custom hooks.
Well, sometimes the initial state isn't available until the component calls another hook. The hook provided by create-shared-state can be used exactly like the default `useState` except that state is shared between components.


## Installation

```sh
yarn add create-shared-state
```

## Usage

- Example 1

```javascript
import { create } from 'create-shared-state';

const useSharedState = create();

const useCounter = () => useSharedState(0); // the custom hook useCounter can be used in any component

const [counter, setCounter] = useCounter() // use in components

```
<br>

- Example 2

```javascript
import { create } from 'create-shared-state';
import { useForm } from 'react-hook-form';


const useSharedState = create();

/**
* The logic for this form and its methods is accessible from anywhere.
* This makes it possible for one component to handle updating and validating the form,
* and another component to handle the submission for examaple. 
*/
const useOnboardingForm = () => {
  const methods = useForm()
  
  const [sharedMethods] = useSharedState(methods)

  return sharedMethods
}
```

## License

MIT
