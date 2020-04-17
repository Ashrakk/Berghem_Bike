export declare class TouchSwipe {
    element: any;
    swipeLenght: number;
    xDown: number;
    yDown: number;
    private status;
    constructor(element: any, swipeLenght?: number);
    onLeft(callback?: () => void): void;
    onRight(callback?: () => void): void;
    onUp(callback?: () => void): void;
    onDown(callback?: () => void): void;
    handleTouchMove(evt: TouchEvent): void;
    start(): void;
    stop(): void;
}
