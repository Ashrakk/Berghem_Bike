import { ResponsiveManager } from './responsive.js';
import { Modal } from './modal.js';
export declare class UIManager {
    responsive: ResponsiveManager;
    modals: Modal[];
    modalState: boolean;
    constructor(...allmodals: Modal[]);
    private init;
}
