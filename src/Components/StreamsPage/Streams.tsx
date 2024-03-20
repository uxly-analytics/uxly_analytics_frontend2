import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import StreamsHeader from './StreamsHeader';
import StreamChart from './StreamChart';
import {
  StreamChartRechartBar,
  StreamChartRechartLine,
} from './StreamChartRechart';
import LoadScreen from '../HomePage/HomeComponents/LoadScreen';
import GraphCarousel from './GraphCarousel';
import TransactionDrawer from './TransactionDrawer';
import Search from './Search';
import { Typography } from '@mui/material';
import axios from 'axios';
import defaultdata from './defaultdata.json';

const consoleLog = async () => {
  console.log('Searching!');
};

const Streams: React.FC = () => {
  const [rawD, setRawD] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch last 25 transactions
        const response = await axios.get('https://uxly-analytics-717cfb342dbd.herokuapp.com/previous-stream-transactions');
        const last25Transactions = response.data;
        // Set the last 25 transactions as initial data
        setRawD(last25Transactions);
        setLoading(false);
      } catch (error) {
        // use default data if backend didn't fetch 25 transactions
        console.error('Failed to fetch data:', error);
        const defaultData = defaultdata;
        console.log(defaultData);
        setRawD(defaultData);
        setLoading(false);
      }
    };

    fetchData();

    const socket = io('wss://uxly-analytics-717cfb342dbd.herokuapp.com', {
      transports: ['websocket'],
    });

    // Make streams api active if it is not inactive
    axios
      .get('https://uxly-analytics-717cfb342dbd.herokuapp.com/restart-stream')
      .then((res) => {
        console.log('Streams API is active');
        console.log(res.data);
      });

    socket.on('connect', () => {
      console.log(`Socket connected: ${socket.id}`);
    });

    socket.on('USDT', (dataString) => {
      try {
        let data = [...dataString];
        data = data.map((item) => {
          return {
            ...item,
            time: new Date(item.blockTimestamp),
            hourAndMinute:
              new Date(item.blockTimestamp).getHours() +
              ':' +
              new Date(item.blockTimestamp).getMinutes(),
          };
        });
        // Reversethe data array by time in descending order (most recent first)
        data.reverse();
        setRawD(data);
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
      <div className="app-container">
        <section className="header-section">
          <StreamsHeader />
        </section>
        <div className="center-content">
          <Search onSubmit={consoleLog} />
          <Typography variant="h4" color="white">
            Smart Contract Transactions
          </Typography>
        </div>
      </div>
      <div className="relative mt-[-70px]">
        {loading ? (
          <LoadScreen />
        ) : (
          <>
            <GraphCarousel data={rawD} />
            <div className="mt-5 flex justify-center">
              <TransactionDrawer data={rawD} />
            </div>
          </>
        )}
      </div>

      <div>
        <h2>
          {/* <DisplayStreamsData rawData={rawData} /> */}
          {/* {rawD && <StreamChart data={rawD} />} */}
          {/*rawD && <StreamChartRechartBar data={rawD} />}
          {rawD && <StreamChartRechartLine data={rawD} />}

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
