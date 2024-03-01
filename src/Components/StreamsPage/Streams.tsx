import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from '../HomePage/HomeComponents/HomeHeader';
import StreamChart from './StreamChart';
import StreamChartRechart from './StreamChartRechart';
import LoadScreen from '../HomePage/HomeComponents/LoadScreen';

const Streams: React.FC = () => {
  const [rawD, setRawD] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket = io('wss://uxly-analytics-717cfb342dbd.herokuapp.com', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log(`Socket connected: ${socket.id}`);
    });

    socket.on('USDT', (dataString) => {
      try {
        console.log('dataString', dataString);
        setRawD(dataString);
        setLoading(false);
        // const data = JSON.parse(dataString);
        // console.log('USDT', data);

        // setRawD(data);
        // if (data && data.time && Array.isArray(data.senders)) {
        //   setRawData((prevData) => {
        //     const size = 100;
        //     let newData = initializeStreamData();

        //     // Map over the incoming data and copy it to the new structure
        //     data.time.forEach((item: number, index: number) => {
        //       if (index < size) {
        //         newData.time[index] = item;
        //         newData.values[index] = data.values[index] || '0';
        //         newData.decimalValues[index] = data.decimalValues[index] || '0';
        //         newData.senders[index] = data.senders[index] || '';
        //         newData.receivers[index] = data.receivers[index] || '';
        //         // Calculate the average value if needed or use the one provided
        //         newData.averageValue =
        //           data.averageValue || prevData.averageValue;
        //       }
        //     });

        //     return newData;
        //   });
        // }
      } catch (error) {
        console.error('Failed to parse data', error);
      }
    });

    // Clean up the effect by disconnecting the socket when the component unmounts
    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, []); // The empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <section className="header-section">
        <Header />
      </section>
      <section className="streams-header-section">
        <h1>Streams</h1>
      </section>

      <div>
        <h2>
          {loading && <LoadScreen />}
          {/* <DisplayStreamsData rawData={rawData} /> */}
          {/* {rawD && <StreamChart data={rawD} />} */}
          {rawD && <StreamChartRechart data={rawD} />}

          {/* <DisplayStreamsData rawData={testData} /> */}
          {/* {rawData && (
              <div>
                <h2>
                  Received Data:<pre>{JSON.stringify(rawData, null, 2)}</pre>
                </h2>
              </div>
            )} */}
        </h2>
      </div>
    </div>
  );
};

export default Streams;
