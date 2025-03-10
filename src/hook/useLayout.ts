import { useState } from "react";
import { Layouts } from "react-grid-layout";

const useLayout = () => {
    const getLayouts = (): Layouts => {
        return {
            lg: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20 },
                { i: "2", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20 },
                { i: "3", x: 0, y: 40, w: 6, h: 40, minW: 3, minH: 20 },
                { i: "4", x: 6, y: 40, w: 6, h: 40, minW: 3, minH: 20 },
            ],
            md: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20 },
                { i: "2", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20 },
                { i: "3", x: 0, y: 40, w: 6, h: 40, minW: 3, minH: 20 },
                { i: "4", x: 6, y: 40, w: 6, h: 40, minW: 3, minH: 20 },
            ],
            sm: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 2, minH: 4 },
                { i: "2", x: 0, y: 40, w: 6, h: 40, minW: 2, minH: 20 },
                { i: "3", x: 0, y: 80, w: 6, h: 40, minW: 2, minH: 20 },
                { i: "4", x: 0, y: 120, w: 6, h: 40, minW: 2, minH: 20 },
            ],
            xs: [
                { i: "1", x: 0, y: 0, w: 4, h: 40, minW: 2, minH: 4 },
                { i: "2", x: 0, y: 40, w: 4, h: 40, minW: 2, minH: 20 },
                { i: "3", x: 0, y: 80, w: 4, h: 40, minW: 2, minH: 20 },
                { i: "4", x: 0, y: 120, w: 4, h: 40, minW: 2, minH: 20 },
            ],
            xxs: [
                { i: "1", x: 0, y: 0, w: 2, h: 40, minW: 1, minH: 4 },
                { i: "2", x: 0, y: 40, w: 2, h: 40, minW: 1, minH: 20 },
                { i: "3", x: 0, y: 80, w: 2, h: 40, minW: 1, minH: 20 },
                { i: "4", x: 0, y: 120, w: 2, h: 40, minW: 1, minH: 20 },
            ],
        };
    };

    const [layouts, setLayouts] = useState<Layouts>(getLayouts());

    const handleResizeStart = () => {
        document.querySelector('.layout')?.classList.add('resizing');
    };

    const handleResizeStop = () => {
        document.querySelector('.layout')?.classList.remove('resizing');
    };

    const handleDragStart = () => {
        document.querySelector('.layout')?.classList.add('dragging');
    };

    const handleDragStop = () => {
        document.querySelector('.layout')?.classList.remove('dragging');
    };

    return { layouts, setLayouts, handleResizeStart, handleResizeStop, handleDragStart, handleDragStop };
};

export default useLayout;
