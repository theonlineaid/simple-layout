import { Responsive, WidthProvider } from "react-grid-layout";
import Ag from "./Ag";
import { useState } from "react";
import CustomDialog from "../custom/CustomDialog";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import useLayout from "../hook/useLayout";
import AgTheme from "./AgTheme";
import { AppBar, Toolbar } from "@mui/material";
import AddTab from "./tab/AddTab";
import { removeTabName } from "../redux/slice/addTabName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setActiveTab } from "../redux/slice/activeTab";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Sample components
const CompB = () => (
  <div style={{ background: "#ADFF2F", height: "100%" }}>Component B</div>
);
const CompC = () => (
  <div style={{ background: "#00CED1", height: "100%" }}>Component C</div>
);
const CompD = () => (
  <div style={{ background: "#FF69B4", height: "100%" }}>
    Component other data
  </div>
);

const Layout = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const {
    layouts,
    handleResizeStart,
    handleResizeStop,
    handleDragStart,
    handleDragStop,
  } = useLayout();

  const [openModal, setOpenModal] = useState(false);
  const [selectedComponent, setSelectedComponent] =
    useState<React.ReactNode | null>(null);
  const [isAnotherModalOpen, setIsAnotherModalOpen] = useState(false); // Track nested modals
  const [theme, setTheme] = useState<string>("none");
  const tabNames = useSelector((state: RootState) => state.addTabName);
  const activeTab = useSelector((state: RootState) => state.activeTab.id);

  const dispatch = useDispatch();

  const handleTabClick = (tabId: string) => {
    dispatch(setActiveTab(tabId));
  };
  const componentMap: { [key: string]: React.ReactNode } = {
    "1": <Ag theme={theme} />,
    "2": <Ag theme={theme} />,
    "3": <Ag theme={theme} />,
    "4": <CompD />,
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const handleHeaderClick = (itemId: string) => {
    if (!isAnotherModalOpen) {
      // Prevent opening another modal if one is already open
      setSelectedComponent(componentMap[itemId]);
      setOpenModal(true);
      setIsAnotherModalOpen(true); // Set modal as open
    }
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
          <div
            key={item.i}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* Header */}

            <AppBar position="static">
              <Toolbar
                variant="dense"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "30px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="grid-header" style={{ cursor: "move" }}>
                    Header {item.i}
                  </div>
                  {item.i === "1" && (
                    <div>
                      <ul>
                        {tabNames.map((tab: any) => (
                          <li
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                          >
                            {tab.name}
                            <button
                              onClick={() => dispatch(removeTabName(tab.id))}
                            >
                              ❌
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <AddTab />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <AgTheme
                    theme={theme}
                    handleThemeChange={handleThemeChange}
                  />

                  <div onClick={() => handleHeaderClick(item.i)}>
                    <FullscreenIcon />
                  </div>
                </div>
              </Toolbar>
            </AppBar>

            {/* Content */}
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
        onClose={() => {
          setOpenModal(false);
          setIsAnotherModalOpen(false); // Reset when closing
        }}
        isDraggable={!isAnotherModalOpen} // Disable dragging for nested modals
        height="400px"
        isFullScreenButtonVisible={true}
        fullScreen={isFullScreen}
        onFullScreenChange={(newFullScreenState) =>
          setIsFullScreen(newFullScreenState)
        }
      >
        {selectedComponent}
      </CustomDialog>
    </>
  );
};

export default Layout;
