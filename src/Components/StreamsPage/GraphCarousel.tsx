import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  StreamChartRechartBar,
  StreamChartRechartLine,
} from "./StreamChartRechart";

interface ChartComponentProps {
  data: {
    totalValue: number;
    averageValue: number;
    tokenName: string;
    tokenSymbol: string;
    blockNumber: string;
    blockTimestamp: string;
  }[];
}

const GraphCarousel: React.FC<ChartComponentProps> = ({ data }) => {
  return (
    <div
      className="mt-20 flex items-center justify-center"
      style={{ maxHeight: "calc(100vh - 80px)" }}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <StreamChartRechartLine data={data} />
            </CarouselItem>
            <CarouselItem>
              <StreamChartRechartBar data={data} />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-20 z-10 text-4xl " />
          <CarouselNext className="right-20 z-10 text-4xl " />
        </Carousel>
      </div>
    </div>
  );
};

export default GraphCarousel;
