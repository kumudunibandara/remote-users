declare module 'hostApp/UserTheme' {
    import { layoutSlice, toggleTheme } from 'hostApp/UserTheme';
    import type { LayoutState } from 'hostApp/UserTheme';

    export { layoutSlice, toggleTheme };
    export type { LayoutState };
}

declare module 'hostApp/ErrorHandler' {
    import { errorSlice, setError, clearError } from 'hostApp/ErrorSlice';
    import type { ErrorState } from 'hostApp/ErrorSlice';

    export { errorSlice, setError, clearError };
    export type { ErrorState };
}