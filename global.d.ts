
/**
 * This file is purely for your editor (VS Code). 
 * It tells the TypeScript engine that these modules exist 
 * so the red error lines go away, even though we aren't 
 * using a node_modules folder.
 */

// Added missing named exports for React hooks to satisfy the compiler
declare module "react" {
    export const useState: any;
    export const useEffect: any;
    export const useRef: any;
    export const useCallback: any;
    export const useMemo: any;
    export const memo: any;
    export const createContext: any;
    export const useContext: any;
    const React: any;
    export default React;
}

declare module "react-dom/client" {
    const ReactDOM: any;
    export default ReactDOM;
}

declare module "framer-motion" {
    export const motion: any;
    export const AnimatePresence: any;
    export const useScroll: any;
    export const useTransform: any;
    export const useSpring: any;
    export const useInView: any;
    export type MotionValue<T> = any;
}

declare module "react-router-dom" {
    export const HashRouter: any;
    export const Routes: any;
    export const Route: any;
    export const Link: any;
    export const useLocation: any;
}
