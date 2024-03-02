import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface TransactionDataProps {
  data: {
    totalValue: number;
    averageValue: number;
    tokenName: string;
    tokenSymbol: string;
    blockNumber: string;
    blockTimestamp: string;
  }[];
}

const TransactionDrawer: React.FC<TransactionDataProps> = ({ data }) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Latest Transaction Block</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Latest Transaction Block</DrawerTitle>
              <DrawerDescription>
                <p>Block Number: {(data && data[0]?.blockNumber) || "N/A"}</p>
                <p>Token Name: {(data && data[0]?.tokenName) || "N/A"}</p>
                <p>Token Symbol: {(data && data[0]?.tokenSymbol) || "N/A"}</p>
                <p>
                  Total Value:{" "}
                  {data && data[0]?.totalValue
                    ? `${data[0].totalValue}`
                    : "N/A"}
                </p>
                <p>
                  Block Timestamp: {(data && data[0]?.blockTimestamp) || "N/A"}
                </p>
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <div className="flex-1 text-center">
                  <div className="text-4xl font-bold tracking-tighter">
                    {data && data[0]?.averageValue
                      ? `${data[0].averageValue}`
                      : "N/A"}{" "}
                  </div>
                  <div className="text-muted-foreground text-[0.70rem] uppercase">
                    average transaction value
                  </div>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button>Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TransactionDrawer;
