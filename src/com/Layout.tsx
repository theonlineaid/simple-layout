
import { Responsive, WidthProvider } from "react-grid-layout";
import Ag from "./Ag";
const ResponsiveGridLayout = WidthProvider(Responsive);

// Sample components
const CompA = () => <div style={{ background: "#FFD700", height: "100%" }}>Component A</div>;
const CompB = () => <div style={{ background: "#ADFF2F", height: "100%" }}>Component B</div>;
const CompC = () => <div style={{ background: "#00CED1", height: "100%" }}>Component C</div>;
const CompD = () => <div style={{ background: "#FF69B4", height: "100%" }}>Component other data </div>;



const Layout = () => {
    const getLayoutsFromSomewhere = () => {
        // Example layout configuration
        return {
            lg: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "2", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "3", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "4", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
            ],
            md: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "2", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "3", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "4", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
            ],
            sm: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 1, minH: 4, },
                { i: "2", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "3", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "4", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
            ],
            xs: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 1, minH: 4, },
                { i: "2", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "3", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "4", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
            ],
            xxs: [
                { i: "1", x: 0, y: 0, w: 6, h: 40, minW: 1, minH: 4, },
                { i: "2", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "3", x: 0, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
                { i: "4", x: 6, y: 0, w: 6, h: 40, minW: 3, minH: 20, },
            ],
        };
    };

    const layouts = getLayoutsFromSomewhere();


    const componentMap: any = {
        "1": <Ag />,
        "2": <CompB />,
        "3": <CompC />,
        "4": <CompD />,
    };


    return (
        <ResponsiveGridLayout
            className="layout"
            rowHeight={1}
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 12, sm: 6, xs: 4, xxs: 2 }}
        >
            {layouts.lg.map((item) => {

                return <div key={item.i} style={{ background: "#ccc" }}>
                    {componentMap[item.i]}
                </div>

            })}
        </ResponsiveGridLayout>
    );
};

export default Layout;
