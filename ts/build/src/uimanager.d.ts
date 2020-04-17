import { ResponsiveManager } from './responsive.js';
import { TouchSwipe } from './touchswipe.js';
import { Modal } from './modal.js';
export declare class UIManager {
    responsive: ResponsiveManager;
    modals: Modal[];
    modalState: boolean;
    pageContainer: HTMLElement | undefined | null;
    swipe: TouchSwipe | undefined;
    constructor(...allmodals: Modal[]);
    private init;
}
