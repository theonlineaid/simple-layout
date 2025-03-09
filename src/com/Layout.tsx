import { Responsive, WidthProvider } from "react-grid-layout";
import Ag from "./Ag";
import { useState } from "react";
import CustomDialog from "../custom/CustomDialog";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import useLayout from "../hook/useLayout";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Sample components
const CompA = () => <div style={{ background: "#FFD700", height: "100%" }}>Component A</div>;
const CompB = () => <div style={{ background: "#ADFF2F", height: "100%" }}>Component B</div>;
const CompC = () => <div style={{ background: "#00CED1", height: "100%" }}>Component C</div>;
const CompD = () => <div style={{ background: "#FF69B4", height: "100%" }}>Component other data</div>;

const Layout = () => {

    const [isFullScreen, setIsFullScreen] = useState(false);
    const { layouts, handleResizeStart, handleResizeStop, handleDragStart, handleDragStop } = useLayout();

    const [openModal, setOpenModal] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState<React.ReactNode | null>(null);

    const componentMap: { [key: string]: React.ReactNode } = {
        "1": <Ag />,
        "2": <CompB />,
        "3": <CompC />,
        "4": <CompD />,
    };

    const handleHeaderClick = (itemId: string) => {
        setSelectedComponent(componentMap[itemId]); // Set the selected component
        setOpenModal(true);
    };

    return (
        <>
            <ResponsiveGridLayout
                className="layout"
                rowHeight={1}
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
                draggableHandle={".grid-header"}
                onResizeStart={handleResizeStart}
                onResizeStop={handleResizeStop}
                onDragStart={handleDragStart}
                onDragStop={handleDragStop}
            >
                {layouts.lg.map((item) => (
                    <div key={item.i} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        {/* Header */}
                        <div

                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#fff",
                                height: "30px",
                            }}
                        >
                            <div className="grid-header" style={{ cursor: "move" }}>Header {item.i}</div>

                            <div onClick={() => handleHeaderClick(item.i)}> {/* Pass item.i */}
                                <FullscreenIcon />
                            </div>
                        </div>

                        {/* Content (Fills remaining space) */}
                        <div style={{ height: "calc(100% - 30px)", overflow: "hidden" }}>
                            {componentMap[item.i]}
                        </div>
                    </div>
                ))}
            </ResponsiveGridLayout>

            {/* Custom Dialog with the selected component */}
            <CustomDialog
                title="Modal Title"
                open={openModal}
                onClose={() => setOpenModal(false)}
                isDraggable={true}
                height="400px" // This height is used when the modal is not fullscreen
                isFullScreenButtonVisible={true}
                fullScreen={isFullScreen}
                onFullScreenChange={(newFullScreenState) => setIsFullScreen(newFullScreenState)}
            >
                {selectedComponent}
            </CustomDialog>


        </>
    );
};

export default Layout;


