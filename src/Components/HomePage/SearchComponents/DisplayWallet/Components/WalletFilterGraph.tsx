import React, { useState, ChangeEvent , useEffect} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { TextField, FormControl, InputLabel, Select, MenuItem, Stack , Button, IconButton, ThemeProvider, createTheme } from '@mui/material';
import '../../../HomeComponents/home.css'; // assuming you have a home.css where you will put the CSS
import { SelectChangeEvent } from '@mui/material';
import moment  from 'moment';
import 'chartjs-adapter-moment';
import DeleteIcon from '@mui/icons-material/Delete';
// import { DateRangePicker } from '@mui/x-date-pickers-pro'; // MUI premium feature 
// import {  LocalizationProvider} from '@mui/x-date-pickers'; //'@mui/lab'; 
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


interface GraphProps {
  walletData: {
    transactions: Array<{
      fromAddress: string;
      toAddress: string;
      value: number;
      decimalValue: number;
      blockTimestamp: number;
      blockHash: string;
      gasPrice: string;
    }>;
  };
  address: string;
}

interface FilterType {
    id: string;
    filterType?: string; // Adding this to match the value used in the Select component
    conditionType?: string; // Assuming conditions like "is", "equals", "contains", etc.
    valueType?: string; 
    // Add other properties for the filters here as needed
  }

type Transaction = {
    blockTimestamp?: number;
    date: string; 
    value: number;
    volume: number; 
    fromAddress?: string | null;
    toAddress?: string | null;
  };

const FilterGraph: React.FC<GraphProps> = ({ walletData }) => {
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [chartType, setChartType] = useState<string>('Transaction Values');
  const [searchQuery, setSearchQuery] = useState('');
  const [processedData, setProcessedData] = useState<Transaction[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [data, setData] = useState([]);

  const chartTypes = ['Transaction Values', 'Transaction Volumes', 'Gas Prices']; //'Token transfers', 'NFT transfers','Transaction volume USD', 'Token transaction volume', 'Transactions per hour','Gas fees USD'];
  const [containerHeight, setContainerHeight] = useState(600); // Initial height  
  const minHeight = 600; // Base height for no filters
  const heightPerFilter = 50; // Height added per filter
  const dynamicHeight = minHeight + (filters.length * heightPerFilter);

  const [timeRange, setTimeRange] = useState<string>('1Y');
  const timeRanges = ['1Y', '6M', '90D', '30D', '1D']; // removed , 'Select Date'
  const [selectedDate, setSelectedDate] = useState(new Date()); //useState<Date | null>(null); //useState<Moment | null>(null);
  const [timeScale, setTimeScale] = useState('1D');
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);

  //const [startDate, setStartDate] = useState(new Date());
  //const [openDatePicker, setOpenDatePicker] = useState(false);
 // const [endDate, setEndDate] = useState(new Date());

  // ****************************************************************************************************** // 
  // ****************************************************************************************************** // 
  // ***************************************        FILTERS        **************************************** // 
  // 
  // customToolTip is defined below and filter parameters can be added if seems fit 
  //
  // If filter values are changed below, addFilter() should be modified as well 
  // 
  // Use setProcessedData() for filtered data. processData is the data given to the line chart 
  // Insert filter options here:
  const [filterOptions, setFilterOptions] = useState({
    filterType: ['Type 1', 'Type 2', 'Type 3'],
    conditionType: ['Equals', 'Contains', 'Starts with'],
    valueType: ['Value 1', 'Value 2', 'Value 3']
  });
  
  const [selectedFilters, setSelectedFilters] = useState({
    filterType: '',
    conditionType: '',
    valueType: ''
  });

  // Add filter logic here: 


  
  // ****************************************************************************************************** // 
  // ****************************************************************************************************** // 
 
  // **** Effect for dynamic container sizing **** //
  useEffect(() => {
    const newHeight = minHeight + (filters.length * heightPerFilter);
    setContainerHeight(newHeight);
  }, [filters.length]);
  
  // Function to handle search input changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Convert data to the format required by Recharts based on the selected chart type
  useEffect(() => {
    const transformedData = walletData.transactions.map(t => ({
        rawDate: moment(t.blockTimestamp).valueOf(),
        formattedDate: moment(t.blockTimestamp).isValid() ? moment(t.blockTimestamp).format('MMM DD') : 'Invalid date',
        value: chartType === 'Gas fees USD' ? parseFloat(t.gasPrice || '0') : t.decimalValue, // Directly handle the logic here
        volume: 1,
        fromAddress: t.fromAddress ?? 'N/A',
        toAddress: t.toAddress ?? 'N/A',
    }));
    setData(transformedData);
  }, [walletData.transactions, chartTypes]);

//   const handleDateChange = (newDate: Date | null) => {
//     setSelectedDate(newDate);
//     if (newDate) {
//         setSelectedDate(newDate);
//         const startTime = moment(newDate).startOf('day').valueOf();
//         const endTime = moment(newDate).endOf('day').valueOf();

//         const filteredData = walletData.transactions.filter(t => {
//             const txDate = moment(t.blockTimestamp).valueOf();
//             return txDate >= startTime && txDate <= endTime;
//         }).map(t => ({
//             ...t,
//             date: moment(t.blockTimestamp).format('YYYY-MM-DD'),
//             value: chartType === 'Gas Prices' ? parseFloat(t.gasPrice || '0') : t.decimalValue,
//             volume: 1,
//         }));

//         setProcessedData(filteredData);
//     }
// };

  const calculateTimeRange = () => {
    const now = moment();  // Using moment() to handle current time
  let startTime = now.startOf('day').valueOf();  // Default to start of today (for daily view)
  let endTime = now.endOf('day').valueOf();  // End of today
  
    switch (timeRange) {
      case '1Y':
      startTime = now.subtract(1, 'year').startOf('day').valueOf();
      break;
    case '6M':
      startTime = now.subtract(6, 'months').startOf('day').valueOf();
      break;
    case '90D':
      startTime = now.subtract(90, 'days').startOf('day').valueOf();
      break;
    case '30D':
      startTime = now.subtract(30, 'days').startOf('day').valueOf();
      break;
    case '1D':
      // Already set to today's start and end
      break;
      //  startTime = moment().subtract(1, 'days').valueOf();
       // break;
      // case 'Select Date':
      //   if (selectedDate) {
      //     startTime = moment(selectedDate).startOf('day').valueOf();
      //     endTime = moment(selectedDate).endOf('day').valueOf();
      //   }
      //   break;
      default:
        // Default to 1 year if nothing else is specified
        break; //startTime = moment().subtract(1, 'years').valueOf();
    }
    console.log(`Time Range: ${timeRange}, Start: ${startTime}, End: ${endTime}`);
  
    return { startTime, endTime };
  };

  // Data Filtered by Time
  const { startTime, endTime } = calculateTimeRange();
  const filteredData = data.filter(d => d.rawDate >= startTime && d.rawDate <= endTime);

  useEffect(() => {
    const calculateTimeRange = () => {
    const now = moment();
        let startTime, endTime;

        switch (timeRange) {
            case '1Y':
                startTime = now.subtract(1, 'years').startOf('day').valueOf();
                break;
            case '6M':
                startTime = now.subtract(6, 'months').startOf('day').valueOf();
                break;
            case '90D':
                startTime = now.subtract(90, 'days').startOf('day').valueOf();
                break;
            case '30D':
                startTime = now.subtract(30, 'days').startOf('day').valueOf();
                break;
            case '1D':
                startTime = now.subtract(1, 'days').startOf('day').valueOf();
                endTime = now.endOf('day').valueOf();
                break;
            // case 'Select Date':
            //     if (dateRange) {
            //         const [start, end] = dateRange;
            //         startTime = moment(start).startOf('day').valueOf();
            //         endTime = moment(end).endOf('day').valueOf();
            //     }
            //     break;
            default:
                startTime = now.subtract(1, 'years').startOf('day').valueOf();
                endTime = now.endOf('day').valueOf();
        }

        console.log(`Time Range: ${timeRange}, Start: ${startTime}, End: ${endTime}`);
        return { startTime, endTime };
    };
    const { startTime, endTime } = calculateTimeRange();
  
    const filteredData = walletData.transactions.filter(t => {
      const txDate = moment(t.blockTimestamp).valueOf();
      return txDate >= startTime && txDate <= endTime;
    }).map(t => ({
      ...t,
      date: moment(t.blockTimestamp).format('YYYY-MM-DD'),
      value: chartType === 'Gas Prices' ? parseFloat(t.gasPrice || '0') : t.decimalValue,
      volume: 1,
    }));
  
    setProcessedData(filteredData);
  }, [walletData, timeRange, selectedDate, dateRange, chartType]);

  const getVolumeDataByTimeScale = (data, timeScale) => {
    const groupedData = {};

    data.forEach(d => {
      let key;
      switch (timeScale) {
        case 'daily':
          key = moment(d.rawDate).format('YYYY-MM-DD');
          break;
        case 'weekly':
          key = moment(d.rawDate).startOf('isoWeek').format('YYYY-MM-DD');
          break;
        case 'monthly':
          key = moment(d.rawDate).startOf('month').format('YYYY-MM-DD');
          break;
        case 'hourly':
          key = moment(d.rawDate).startOf('hour').format('YYYY-MM-DD HH:00');
          break;
        case 'minute':
          key = moment(d.rawDate).startOf('minute').format('YYYY-MM-DD HH:mm');
          break;
        default:
          key = moment(d.rawDate).format('YYYY-MM-DD');
          break;
      }

      if (!groupedData[key]) {
        groupedData[key] = { date: key, volume: 0 };
      }
      groupedData[key].volume += 1;
     // groupedData[key].value += d.value; // This line can be adjusted if we need the sum of values as well
    });
    console.log("Volume Data:", groupedData);
    return Object.values(groupedData);
  };


  const getFilteredDataByTimeScale = (data, timeScale) => {
    const groupedData = {};

    data.forEach(d => {
        let key;
        switch (timeScale) {
            case 'daily':
                key = moment(d.rawDate).format('MM-DD'); //moment(d.date).format('YYYY-MM-DD');
                break;
            case 'weekly':
                key = moment(d.rawDate).startOf('isoWeek').format('MM-DD'); //`Week ${moment(d.date).isoWeek()} of ${moment(d.date).year()}`;
                break;
            case 'monthly':
                key = moment(d.rawDate).startOf('month').format('MM-DD'); //  moment(d.date).format('MMM YYYY');
                break;
            case 'hourly':
                key = moment(d.rawDate).startOf('hour').format('MM-DD HH:00'); //moment(d.date).format('MMM DD HH:00');
                break;
            case 'minute':
                key = moment(d.rawDate).startOf('minute').format('MM-DD HH:mm');
                break;
            default:
                key = moment(d.rawDate).format('MMM DD');
                break;
        }

        if (!groupedData[key]) {
            groupedData[key] = { date: key, value: 0, volume: 0  };
        }
        groupedData[key].value += d.value;
        groupedData[key].volume += 1;
    });

    return Object.values(groupedData);
};


  
  const formatYAxis = (tick: number) => {
    if (chartType === 'Transaction Volumes') {
      return tick.toString();
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(tick);
};

 // <YAxis width={80} tickFormatter={formatYAxis} />

// Adjust XAxis tick formatting based on the selected time scale
const formatXAxis = (date) => {
  return formatDate(date, timeScale);
};

// Function to apply search and other filters to the data
const applyFilters = (data: Transaction[]) => {
  if (!searchQuery) return data; // Return original data if no search query
    return data.filter(t => t.fromAddress?.includes(searchQuery) || t.toAddress?.includes(searchQuery));

    // let filteredData = data;
    // // Filter by searchQuery, and others if necessary
    // if (searchQuery) {
    //   filteredData = filteredData.filter(
    //     t => t.fromAddress?.includes(searchQuery) || t.toAddress?.includes(searchQuery)
    //   );
    // }
    // console.log('Filtered Data:', filteredData);
    // return filteredData;
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Date: ${data.date}`}</p>
          <p>{chartType === 'Gas Prices' ? `Gas Price: $${data.value.toLocaleString('en-US')}` : 
              chartType === 'Transaction Volumes' ? `Volume: ${data.volume}` : `Value: $${data.value.toLocaleString('en-US')}`}</p>
          <p>{`From: ${data.fromAddress}`}</p>
          <p>{`To: ${data.toAddress}`}</p>
          {/* ... other info */}
        </div>
      );
    }
    return null;
  };

  const filteredDataWithRequiredProps = filteredData.map((d): Transaction => ({
    blockTimestamp: d.rawDate,
    date: d.formattedDate, 
    //rawDate: d.rawDate,
    //formattedDate: moment(d.rawDate).isValid() ? moment(d.rawDate).format('MMM DD') : 'Invalid date',
    value: d.value,
    volume: d.volume,
    // Add default or actual values for fromAddress and toAddress if needed
    fromAddress: d.fromAddress ?? 'N/A', // Use nullish coalescing to provide a default
    toAddress: d.toAddress ?? 'N/A',
  }));

  const calculateStartTime = () => {
    switch (timeRange) {
      case '1Y': return moment().subtract(1, 'years').startOf('day').valueOf();
      case '6M': return moment().subtract(6, 'months').startOf('day').valueOf();
      case '90D': return moment().subtract(90, 'days').startOf('day').valueOf();
      case '30D': return moment().subtract(30, 'days').startOf('day').valueOf();
      case '1D': return moment().subtract(1, 'days').startOf('day').valueOf();
      // case 'Select Date':
      //   return selectedDate ? moment(selectedDate).startOf('day').valueOf() : moment().startOf('day').valueOf();
      default: return moment().subtract(1, 'years').startOf('day').valueOf();
    }
  };

  // Filter Data by 
  // let processedData = getFilteredDataByTimeScale(filteredDataWithRequiredProps, timeScale);
  // Filtered data for rendering in the LineChart
  const displayedData = applyFilters(filteredDataWithRequiredProps);

  useEffect(() => {
    const startTime = calculateStartTime();
    const endTime = moment().endOf('day').valueOf();

    const transactions = walletData.transactions.map(t => ({
      blockTimestamp: t.blockTimestamp,
      date: moment(t.blockTimestamp).format('YYYY-MM-DD'),  // Standardizing date format
      value: chartType === 'Gas Prices' ? parseFloat(t.gasPrice ) : t.decimalValue,
      volume: 1,
      fromAddress: t.fromAddress ?? 'N/A',
      toAddress: t.toAddress ?? 'N/A',
    }));

    const timeFilteredData = transactions.filter(t => {
      const date = moment(t.blockTimestamp).valueOf();
      return date >= startTime && date <= endTime;
    });

    const searchFilteredData = searchQuery ? timeFilteredData.filter(t => 
      t.fromAddress.includes(searchQuery) || t.toAddress.includes(searchQuery)
    ) : timeFilteredData;

    setProcessedData(searchFilteredData);
  }, [walletData, timeRange, selectedDate, searchQuery, chartType]);


/***********TESTING***********/
  useEffect(() => {
    console.log("Processed Data updated:", processedData);
    console.log("Chart Type updated:", chartType);
  }, [processedData, chartType]);
  
  

  const handleDateRangeChange = (newRange: [Date, Date] | null) => {
    setDateRange(newRange);
    if (newRange) {
        const [start, end] = newRange;
        const startTime = moment(start).startOf('day').valueOf();
        const endTime = moment(end).endOf('day').valueOf();

        const filteredData = walletData.transactions.filter(t => {
            const txDate = moment(t.blockTimestamp).valueOf();
            return txDate >= startTime && txDate <= endTime;
        }).map(t => ({
            ...t,
            date: moment(t.blockTimestamp).format('YYYY-MM-DD'),
            value: chartType === 'Gas Prices' ? parseFloat(t.gasPrice || '0') : t.decimalValue,
            volume: 1,
        }));

        setProcessedData(filteredData);
    }
};


  useEffect(() => {
    if (timeRange === 'Select Date') {
        handleDateRangeChange(dateRange);
    }
}, [timeRange, dateRange]);

  const handleTimeScaleChange = ( event: SelectChangeEvent<string> ) => {
    setTimeScale(event.target.value as string);
   // const newData = getFilteredDataByTimeScale(filteredDataWithRequiredProps, event.target.value);
    // setProcessedData(newData);
  };
  


  // Function to handle adding a new filter
  const addFilter = () => {
    setFilters(filters => [
        ...filters,
        { id: `filter-${filters.length}`, filterType: 'Type 1', conditionType: 'Equals', valueType: 'Value 1' }, // Initialize with empty strings or appropriate defaults
      ]);
    setContainerHeight(currentHeight => currentHeight + 50); // Adjust height increment as needed
  };

  // Function to handle removing a filter
  const removeFilter = (filterId: string) => {
    setFilters(filters => filters.filter(filter => filter.id !== filterId));
  // Optionally adjust the container height
  setContainerHeight(currentHeight => Math.max(minHeight, currentHeight - heightPerFilter));
};

  const handleFilterTypeChange = (
    event: SelectChangeEvent, // Update this type if needed
    index: number,
    filterProperty: keyof FilterType
  ) => {
    // Placeholder function, replace with actual logic
    const newFilters = [...filters];
    newFilters[index] = {
      ...newFilters[index],
      [filterProperty]: event.target.value as string,
    };
    setFilters(newFilters);
  };

  const handleFilterChange = (index, key, value) => {
    const updatedFilters = filters.map((filter, i) => 
      i === index ? { ...filter, [key]: value } : filter
    );
    setFilters(updatedFilters);
  };

  // Styling for filters 
  const commonSelectStyles = {
    color: 'white',
    borderColor: 'grey',
    '& .MuiListItem-button:hover': {
      backgroundColor: 'darkgrey',
    },
    '.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cacaca9f' },
    '&:Mui-hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
    MenuProps: {
      PaperProps: {
        sx: {
          bgcolor: '#333',
          color: 'white',
          borderColor: 'grey',
          '& .MuiMenuItem-root': {
            '&:hover': {
              bgcolor: '#e76772',
            },
            '&.Mui-selected': {
              bgcolor: '#e76772',
            },
          },
        },
      },
    }
  };
  // Create a theme instance to customize the DatePicker
  const theme = createTheme({
  palette: {
    primary: {
      main: '#ff69b4', // Example of setting a custom primary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // Ensures text color is white
        },
      },
    },
    // Customizing the TextField used within DatePicker
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: 'pink',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'pink',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'pink',
            },
          },
        },
      },
    },
  },
  });

  // Function to render each filter UI 
  // *************** UPDATE IF FILTERS ARE MODIFIED  *************** // 
  const renderFilter = (filter, index) => (
    <div key={filter.id} className="filter-set">
      <div className="filter-block">
        <FormControl variant="outlined" margin="dense" fullWidth >
          <InputLabel>Filter Type</InputLabel>
          <Select
            value={filter.filterType}
            onChange={(e) => handleFilterChange(index, 'filterType', e.target.value)}
            label="Filter Type"
            sx={commonSelectStyles}
          >
            {filterOptions.filterType.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="dense" fullWidth>
          <InputLabel>Condition Type</InputLabel>
          <Select
            value={filter.conditionType}
            onChange={(e) => handleFilterChange(index, 'conditionType', e.target.value)}
            label="Condition Type"
            sx={commonSelectStyles}
          >
            {filterOptions.conditionType.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="dense" fullWidth>
          <InputLabel>Value Type</InputLabel>
          <Select
            value={filter.valueType}
            onChange={(e) => handleFilterChange(index, 'valueType', e.target.value)}
            label="Value Type"
            sx={commonSelectStyles}
          >
            {filterOptions.valueType.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton style={{ marginRight: '8px', color: 'whitesmoke'}} onClick={() => removeFilter(filter.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
  // *************************************************************** //

  // Styles for Date Picker // 
  // const customDatePickerStyles = {
  //   "& .MuiInputBase-root": {
  //     color: "white", // Changes the text color
  //     height: "25px", // Specific height for the input field
  //     width: "auto",   // Adjust width to fit content
  //   "& input": {
  //     color: "white",  // Ensures text color is consistently white
  //   }
  //   },
  //   "& .MuiOutlinedInput-notchedOutline": {
  //     borderColor: "#ffffff68", // Border color
  //   },
  //   "& .MuiSvgIcon-root": {
  //     color: "white", // Icon color
  //   },
  //   "& .MuiInputLabel-root": {
  //     color: "white", // Label color
  //     marginTop: "-15px",
  //     transform: 'translate(16px, -10px) scale(1)', // Adjust label positioning if necessary
  //   "&.Mui-focused": {
  //     color: "pink", // Change label color when focused
  //     width: "40px",
  //   }
  //   },
  //   width: "62.5%",
  //   marginRight: "-5px",
  //   marginLeft:"0px",
    
    
  //   "& .MuiInputLabel-root.Mui-focused": { color: "#979797" }, //styles the label
  //   "& .MuiOutlinedInput-root": {
  //   "&:hover > fieldset": { borderColor: "#C7C8CD" },
  //                    height: "34px",
  //                    borderRadius: "6px",
  //                    color: "white",
  //                    borderColor: "grey",
  //                    marginTop: "-15px",
  //                   },
  // };

  // Handle changes for two separate DatePickers simulating a DateRangePicker
  // const handleStartDateChange = (date) => {
  //   setStartDate(date);
  // };

  // const handleEndDateChange = (date) => {
  //   setEndDate(date);
  // };

  // const renderDatePicker = () => {
  //     return (
  //       <ThemeProvider theme={theme}>
  //     <LocalizationProvider dateAdapter={AdapterDateFns}>
  //       <div className="date-range-picker-container">
  //         {timeRange === '1D' ? (
  //           <DatePicker
  //             label="Select Date"
  //             className="my-datepicker"
  //             value={selectedDate}
  //             onChange={setSelectedDate /*handleDateChange*/}
  //             sx={customDatePickerStyles}
  //           />
  //         ) : (
  //         <DateRangePicker
  //           className="date-range-picker"
  //           value={dateRange}
  //           onChange={handleDateRangeChange}
  //           sx={customDatePickerStyles}
            
  //         />

  //         )}
  //         </div>
  //     </LocalizationProvider>
  //   </ThemeProvider>
  //     );
  // }


// Helper function to format date based on the selected time scale


const formatDate = (timestamp, scale) => { // Format for time scale
  switch (scale) {
    case 'weekly':
      return `Week ${moment(timestamp).isoWeek()} of ${moment(timestamp).year()}`;
    case 'monthly':
      return moment(timestamp).format('MMM YYYY');
    case 'daily':
      return moment(timestamp).format('MMM DD');
    case 'hourly':
      return moment(timestamp).format('HH:mm');
    case 'minute':
      return moment(timestamp).format('HH:mm');
    default:
      return moment(timestamp).format('MMM DD');
  }
};

const updateTimeScale = (range) => {
  switch(range) {
    case '1Y':
    case '6M':
    case '90D':
    case '30D':
      setTimeScale('daily');  // Example: Use 'daily' for these ranges
      break;
    case '1D':
      setTimeScale('hourly');  // Example: Use 'hourly' for daily data
      break;
    default:
      setTimeScale('daily');  // Default fallback
  }
}

useEffect(() => { // Effect for updating time scale 
  updateTimeScale(timeRange);
}, [timeRange]);

const updateDataBasedOnTimeRange = (range) => {
  const { startTime, endTime } = calculateTimeRange();

  const filteredData = walletData.transactions.filter(t => {
    const txDate = moment(t.blockTimestamp).valueOf();
    return txDate >= startTime && txDate <= endTime;
  }).map(t => ({
    ...t,
    date: moment(t.blockTimestamp).format('YYYY-MM-DD'),
    rawDate: t.blockTimestamp,
    formattedDate: moment(t.blockTimestamp).format('YYYY-MM-DD'),
    value: chartType === 'Gas Prices' ? parseFloat(t.gasPrice) : t.decimalValue,
    volume: 1,
    fromAddress: t.fromAddress ?? 'N/A',
    toAddress: t.toAddress ?? 'N/A',
  }));

  setProcessedData(filteredData);
  console.log("Updated Data for range:", range, filteredData);
};

useEffect(() => {
  updateDataBasedOnTimeRange(timeRange);
}, [walletData, timeRange, selectedDate, searchQuery, chartType]);

// useEffect(() => {
//   console.log("Processed Data:", processedData);
// }, [processedData]);

  const handleTimeRangeChange = (newRange: string) => {
    setTimeRange(newRange);
    //const newScale = newRange === '1D' ? 'hourly' : 'daily';
    //setTimeScale(newScale);
    if (newRange !== 'Select Date') {
      setSelectedDate(null); 
      updateDataBasedOnTimeRange(newRange); // Function to update data based on the selected time range
  }// Function to update data based on the selected time range
    // updateTimeScale(newRange);  // Update time scale based on the new range
  // Trigger data update here if necessary
  };

  // Choose what data from wallet is displayed on graph 
  const handleChartChange = (event: SelectChangeEvent<string>) => {
    setChartType(event.target.value as string);
  };

  /************** Testing **************** */
  useEffect(() => {
    console.log("Processed Data:", processedData); // Log to see what data is finally being used in the graph.
  }, [processedData]);

  // After filtering
console.log("Filtered Data:", filteredDataWithRequiredProps);
console.log("Displayed Data:", displayedData);



  return (
    <div className="graph-container" style={{ minHeight: `${dynamicHeight}px` }}>
      <Stack spacing={2} direction="column">
      <div className="filters-container">
        {/* Container for Transactions and Search */}
    <div className="transactions-search-container">
        <Stack> 
        <FormControl variant="outlined" style={{ minWidth: 120, color: 'white'}}>
        <InputLabel style={{ color: 'white', marginTop:'-5px', marginLeft: '-15px' }}>Transaction History</InputLabel>
          <Select
            label="Select Chart Type"
            value={chartType}
            onChange={handleChartChange}
            style={{ width: 'auto'/*'164px'*/, minWidth: '140px', flexGrow: .1, marginLeft: '-10px', marginTop: '-10px'}} 
            sx={{
                height: '45px',
                width: '100px',
                color: 'white',
                borderColor: 'grey',
                // ... other styles
                '& .MuiListItem-button:hover': {
                  backgroundColor: 'darkgrey', // Background color on hover in the dropdown
                  width: 'auto',
                },
                '.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'pink', // Border color when the select is focused
                },
                // ... other styles
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    padding: 'px',
                    bgcolor: '#333', // Sets the background color of the dropdown
                    color: 'white', // Sets the text color of the dropdown
                    borderColor: 'grey',
                    '& .MuiMenuItem-root': {
                      '&:hover': {
                        bgcolor: '#e76772', // Sets the background color of the dropdown items on hover
                      },
                      '&.Mui-selected': {
                        bgcolor: '#e76772', // Sets the background color of the dropdown items when selected
                      },
                    },
                  },
                },
              }}
          > 
            <MenuItem value="Transaction Volumes">Volume</MenuItem>
            <MenuItem value="Transaction Values">Values USD</MenuItem>
            <MenuItem value="Gas Prices">Gas Prices</MenuItem>
          </Select> 
          </FormControl>

          
  <div className="checkbox-container">
  <input
    type="checkbox"
    id="toggleGrid"
    checked={showGrid}
    onChange={(e) => setShowGrid(e.target.checked)}
  />
  <label htmlFor="toggleGrid">Toggle Grid</label>
</div>

</Stack>

        <TextField
          id="search-input"
          label="Search Address"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange} 
          size="medium"
          className="filter-input"
          style={{ width: 'auto', maxWidth: '200px', flexGrow: 1, marginTop: '-37px'}} 
          InputLabelProps={{
            style: { color: 'grey', fontSize: '1rem' , height: '20px'}, // Set the color and size of the label
          }}
          sx={{
            '& label': {
            color: 'white', // Color of the label
            fontSize: '1em', // Size of the label\
            
          },
            input: { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f78a93b0' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f78a93b0' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f78a93b0' },
            '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'pink',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'f78a93b0',
      },
      '&:hover fieldset': {
        borderColor: 'pink',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'pink',
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'pink',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'pink',
        },
        '&:hover fieldset': {
          borderColor: 'pink',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'pink',
        },
      },
      '& .MuiInputBase-input': {
        color: 'white', // Text color
        fontSize: '1rem', // Font size
      },
    },
          }}
          InputProps={{ // Overriding the input styles
            style: {
              color: 'white', // Sets the text color to white
              fontSize: '1rem', // Makes
            }
        }}
        />
        </div>
        <FormControl variant="outlined" 
                    size="small" 
                    sx={{
                        width: 0,
                        input: { color: 'white' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#f78a93b0' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#f78a93b0' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#f78a93b0' },
                        '& .MuiSelect-select': {
                            color: 'white', // Text color
                            fontSize: '1rem' // Adjust font size as needed
                          },
                          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'pink', // Border color when focused
                          },
                          '& .MuiPaper-root': {
                            bgcolor: 'gray', // Background color of the dropdown
                            color: 'white', // Text color in the dropdown
                          },
                          '& .MuiInputLabel-root': {
                            color: 'grey', // Color for the label
                            fontSize: '1rem', // Size for the label
                            '&.Mui-focused': {
                              color: 'white', // Color for the label when focused
                            },
                          },
                      }}
        >
        </FormControl>
      {/* Container for the Add Filter button aligned to right */}
    
        <Stack marginRight='0px !important' marginTop='-5px' spacing={2} direction="column" sx={{ minWidth: 540, minHeight:70 }}>
        
          <Button variant="outlined" onClick={addFilter} >+ Add Filter</Button>
          
          {/* Container for dynamically added filters */}
           <div className="filters-dynamic-container">
            <div className="filter-row">
            {filters.map((filter, index) => renderFilter(filter, index))}
          </div>
          </div>
          </Stack>

      </div>
      {/***************** END FILTER SECTION ***************** */}
      {/***************** ****************** ***************** */}
      {/***************** ****************** ***************** */}



      {/* Time Range Buttons */}
  <div  style={{ display: 'flex',justifyContent: 'flex-end',marginRight: '25px'}} >

  <FormControl variant="outlined" style={{ minWidth: 120, color: 'white' }}>
  <InputLabel style={{ color: 'white' }}>Time Scale</InputLabel>
  <Select
    value={timeScale}
    onChange={handleTimeScaleChange}
    label="Time Scale"
    
    style={{ color: 'white' , height: '35px', borderColor: 'grey'}}
    sx={{
        height: '45px',
        color: 'white',
        borderColor: 'grey',
        // ... other styles
        '& .MuiListItem-button:hover': {
          backgroundColor: 'darkgrey', // Background color on hover in the dropdown
        },
        '.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'pink', // Border color when the select is focused
        },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cacaca9f' },
        // ... other styles
        '&:Mui-hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'pink',
        },
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            padding: 'px',
            bgcolor: '#333', // Sets the background color of the dropdown
            color: 'white', // Sets the text color of the dropdown
            borderColor: 'grey',
            '& .MuiMenuItem-root': {
              '&:hover': {
                bgcolor: '#e76772', // Sets the background color of the dropdown items on hover
              },
              '&.Mui-selected': {
                bgcolor: '#e76772', // Sets the background color of the dropdown items when selected
              },
            },
          },
        },
      }}
  >
    <MenuItem value="weekly">Weekly</MenuItem>
    <MenuItem value="daily">Daily</MenuItem>
    <MenuItem value="hourly">Hourly</MenuItem>
    <MenuItem value="minute">Minute</MenuItem>
  </Select>
</FormControl>
           
          {timeRanges.map(range => (
            // range !== 'Select Date' ? (
            <Button
              key={range}
              variant={timeRange === range ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => handleTimeRangeChange(range)}
              style={{
                marginLeft: 4,
                backgroundColor: timeRange === range ? '#ff69b480' : 'transparent', // pink when selected
                color: timeRange === range ? 'white' : 'pink', // text white when selected, otherwise pink
                border: `1px solid ${timeRange === range ? '#e76772' : '#e76772'}`, // border color changes when selected
                fontSize: '16px',
                height:'35px',
                minWidth: '10px',
                width: '40px',
                padding: '10px',

            }}
            >
              {range}
            </Button>
          //  ) : (
              // <ThemeProvider theme={theme}>
              // <LocalizationProvider dateAdapter={AdapterDateFns}>
              // {renderDatePicker()}   
        
              //   </LocalizationProvider>
              //   </ThemeProvider>
            //  )
    ))}
    
  </div>
      <ResponsiveContainer width="100%" height={400} >
      {processedData.length > 0 ? (
        <AreaChart data={chartType === 'Transaction Volumes' ? getVolumeDataByTimeScale(processedData, timeScale) : processedData} margin={{ top: 10, right: 30, left: 15, bottom: 20 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82000080" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82000080" stopOpacity={0} />
          </linearGradient>
        </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={showGrid ? "black" : "transparent"} />
          <XAxis dataKey="date" stroke="#ffffff" 
                 label={{ value: 'Timeline', position: 'insideBottom', offset: -19 , fontSize: '23px'}} 
                 tickFormatter={(tick) => {
                  const date = moment(tick);
                  if (timeRange === '90D' || timeRange === '30D') {
                    return date.format('MMM DD');
                  }
                  return date.format('MMM \'YY');
                }}
                color='white'
                tick={{ fill: 'white' }}
              />
              <YAxis width={80} tickFormatter={tick => formatYAxis(tick) /*tick => `$${tick.toFixed(2)}`*/} 
              tick={{ fill: 'white' }} stroke="#ffffff" 
              label={{ value: chartType === 'Transaction Volumes' ? 'Volume' : 
                              chartType ==='Transaction Values' ? 'Value' : 'Gas Price', 
                       angle: -90, position: 'insideLeft', fontSize: '18px',
                       offset: -8
                        }} //value: 'Decimal Value', angle: -90, position: 'insideLeft' , fontSize: '18px' }} /*width={80} tickFormatter={tick => `$${tick.toFixed(2)}`} *//
              /> 
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey={ chartType === 'Transaction Volumes' ? 'volume' : 'value' }
                stroke="#ff69b480" fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
        ) : (
            <div className="no-data-message">No Data To Display</div>
            
          )}
      </ResponsiveContainer>
      </Stack>
    </div>
  );
};

export default FilterGraph;