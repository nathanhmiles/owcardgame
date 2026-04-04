## Plan: TypeScript Conversion for Overwatch Card Game

**TL;DR:** Migrate the React app from JavaScript to TypeScript by creating a `tsconfig.json`, installing TypeScript dependencies, renaming `.js` files to `.tsx`/`.ts`, adding type annotations to state management, React components, context objects, and utility functions, and updating import paths. The conversion can proceed incrementally per component with proper typing for React hooks, reducer actions, and third-party library types.

### Steps

1. **Install TypeScript and type dependencies**
    - Add `typescript`, `@types/react`, `@types/react-dom`, and `@types/react-beautiful-dnd` to `package.json`
    - Create `tsconfig.json` with React JSX settings, baseUrl path alias, and strict mode enabled

2. **Type core utilities and data**
    - Convert `src/helper.js` to `helper.ts` with proper types for `PlayerCard` class and exported functions
    - Convert `src/data.js` to `data.ts` with interfaces for hero structure, effects, and game state shape

3. **Type context and state management**
    - Convert `src/context/gameContext.js` and `src/context/turnContext.js` to `.ts` with typed context value shapes
    - Add types for `ACTIONS` enum and `reducer` function signatures in `src/App.tsx`

4. **Convert main component and layout components**
    - Convert `src/App.js` to `App.tsx` with typed `useReducer`, `useState`, and event handlers
    - Convert layout components in `src/components/layout/` from `.js` to `.tsx` with proper prop typing

5. **Convert card and counter components**
    - Convert card components in `src/components/cards/` (e.g., `Card.js`, `CardFocus.js`) to `.tsx` with typed props
    - Convert counter components in `src/components/counters/` to `.tsx` with typed state and props

6. **Convert remaining components and entry point**
    - Convert tutorial components in `src/components/tutorial/` to `.tsx`
    - Convert `src/index.js` to `index.tsx`
    - Add index.tsx type declaration if using strict mode

### Further Considerations

1. **External library typing** — `react-beautiful-dnd` and `immer` have partial TypeScript support; verify or add `@types/` packages as needed, and suppress any type errors with `// @ts-ignore` comments if types are incomplete
2. **Incremental adoption** — Convert files in dependency order (utilities → contexts → components) to catch type errors early and test after each major section
3. **Prop drilling vs. typed context** — Consider using typed Context Consumers or custom hooks (`useGameContext`, `useTurnContext`) for cleaner prop typing across nested components
