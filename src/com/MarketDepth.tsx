import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { RootState } from "../redux/store";
import { toggleReversed } from "../redux/slice/marketDepth";

const MarketDepth = () => {
  const dispatch = useDispatch();
  const isReversed = useSelector(
    (state: RootState) => state.marketDepth.isReversed
  );

  const buyOrders = [
    { price: 100.5, quantity: 55, bid: 99.8 },
    { price: 100.4, quantity: 10, bid: 99.7 },
    { price: 100.3, quantity: 15, bid: 99.6 },
  ];

  const sellOrders = [
    { price: 101.0, quantity: 5, bid: 101.2 },
    { price: 101.1, quantity: 10, bid: 101.3 },
    { price: 101.2, quantity: 15, bid: 101.4 },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="contained" onClick={() => dispatch(toggleReversed())}>
        Swap Positions
      </Button>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexDirection: isReversed ? "row-reverse" : "row",
        }}
      >
        {/* Buy Orders */}
        <Card sx={{ minWidth: "50%", backgroundColor: "#e0ffe0" }}>
          <CardContent>
            <Typography variant="h6" color="green" gutterBottom>
              Buy Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Bid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buyOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.bid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Sell Orders */}
        <Card sx={{ minWidth: "50%", backgroundColor: "#ffe0e0" }}>
          <CardContent>
            <Typography variant="h6" color="red" gutterBottom>
              Sell Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Bid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>{order.bid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketDepth;
