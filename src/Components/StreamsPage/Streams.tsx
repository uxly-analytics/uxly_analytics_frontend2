import React, { useEffect, useState } from "react";
import DisplayStreamsData from './StreamsGraph'; 

const Streams: React.FC = () => {
  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const socket = io("http://18.223.123.138:5000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(`Socket connected: ${socket.id}`);
    });

    socket.on("USDT", (data: any) => {
      console.log("USDT", data);
      setRawData(data);
    });

    // Clean up the effect by disconnecting the socket when the component unmounts
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <h1>Streams Page</h1>
      {rawData && (
        <div>
          <h2>
            Received Data:<pre>{JSON.stringify(rawData, null, 2)}</pre>
            <DisplayStreamsData graphData={rawData} />
          </h2>
        </div>
      )}
    </div>
  );
};

export default Streams;
