import React, { useState, ChangeEvent , useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

import { TextField, FormControl, InputLabel, Select, MenuItem, Stack , Button, IconButton, colors} from '@mui/material';
import '../../../HomeComponents/home.css'; // assuming you have a home.css where you will put the CSS
import { SelectChangeEvent } from '@mui/material';
import moment, { Moment }  from 'moment';
import 'chartjs-adapter-moment';
import DeleteIcon from '@mui/icons-material/Delete';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DatePicker } from '@mui/lab'; 
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextFieldProps } from '@mui/material/TextField';
import { VerticalAlignCenter } from '@mui/icons-material';


interface WalletData {
    transactionsData: {
      chain: string;
      inbound_value: number;
      inbound_count: number;
      inbound_mean: number;
      outbound_value: number;
      outbound_count: number;
      outbound_mean: number;
    }[];
  }
  interface GrandTotals {
    [key: string]: {
      chain: string;
      inbound_value: number;
      inbound_count: number;
      inbound_mean: number;
      outbound_value: number;
      outbound_count: number;
      outbound_mean: number;
    };
  }
  
  interface MultipleWalletFilterGraphProps {
    wallets: WalletData[];
  }
/*
interface GraphProps {
  walletData: {
    transactions: Array<{
        block_timestamp: number;
        decimal_value: number;
        from_address?: string;
        to_address?: string;
      }>;
  };
  address: string;
}
*/

interface FilterType {
    id: string;
    filterType?: string; // Adding this to match the value used in the Select component
    conditionType?: string; // Assuming conditions like "is", "equals", "contains", etc.
    valueType?: string; 
    // Add other properties for the filters here as needed
  }

type Transaction = {
    block_timestamp: number;
    date: string; 
    value: number;
    from_address?: string | null;
    to_address?: string | null;
  };

const MultipleWalletFilterGraph: React.FC<MultipleWalletFilterGraphProps> = ({ wallets }) => {
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [timeRange, setTimeRange] = useState<string>('1Y');
  const [chartType, setChartType] = useState<string>('Transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const timeRanges = ['1Y', '6M', '90D', '30D', '1D', 'Select Date'];
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [processedData, setProcessedData] = useState<Transaction[]>([]);


  const chartTypes = ['Transactions', 'Token transfers', 'NFT transfers','Transaction volume USD', 'Token transaction volume', 'Transactions per hour','Gas fees USD'];
  const [containerHeight, setContainerHeight] = useState(600); // Initial height  
  const minHeight = 600; // Base height for no filters
  const heightPerFilter = 50; // Height added per filter
  const dynamicHeight = minHeight + (filters.length * heightPerFilter);
  const [timeScale, setTimeScale] = useState('daily');

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
  
  console.log(moment(1651017600000).format('MMM DD')); // should log something like "Apr 26" for the timestamp corresponding to April 26, 2022


  useEffect(() => {
    const newHeight = minHeight + (filters.length * heightPerFilter);
    setContainerHeight(newHeight);
  }, [filters.length]);
  

  // Function to handle search input changes
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Convert your data to the format required by Recharts
  const data = walletData.transactions.map(t => ({
    rawDate: moment(t.block_timestamp).valueOf(), // Keep the raw timestamp for comparison
    formattedDate: moment(t.block_timestamp).isValid() ? moment(t.block_timestamp).format('MMM DD') : 'Invalid date',
    value: t.decimal_value,
    from_address: t.from_address ?? 'N/A',
    to_address: t.to_address ?? 'N/A',
  }));

  const handleDateChange = (date: Moment | null) => {
    setSelectedDate(date);
    // Process the selected date and update your chart data accordingly
  };

  const calculateTimeRange = () => {
    let endTime = moment().endOf('day').valueOf(); // End of today
    let startTime = moment().startOf('day').valueOf(); // Start of today for daily data
  
    switch (timeRange) {
      case '1Y':
        startTime = moment().subtract(1, 'years').valueOf();
        break;
      case '6M':
        startTime = moment().subtract(6, 'months').valueOf();
        break;
      case '90D':
        startTime = moment().subtract(90, 'days').valueOf();
        break;
      case '30D':
        startTime = moment().subtract(30, 'days').valueOf();
        break;
      case '1D': // Daily
        // already set to start of today
        startTime = moment().subtract(1, 'days').valueOf();
        break;
      case 'Select Date':
        if (selectedDate) {
          startTime = moment(selectedDate).startOf('day').valueOf();
          endTime = moment(selectedDate).endOf('day').valueOf();
        }
        break;
      default:
        // Default to 1 year if nothing else is specified
        startTime = moment().subtract(1, 'years').valueOf();
    }
    return { startTime, endTime };
  };

  // Data Filtered by Time
  const { startTime, endTime } = calculateTimeRange();
  const filteredData = data.filter(d => d.rawDate >= startTime && d.rawDate <= endTime);

  const getFilteredDataByTimeScale = (data, timeScale) => {
    const groupedData = {};

    data.forEach(d => {
        let key;
        switch (timeScale) {
            case 'daily':
                key = moment(d.date).format('MMM DD');
                break;
            case 'weekly':
                key = `Week ${moment(d.date).isoWeek()} of ${moment(d.date).year()}`;
                break;
            case 'monthly':
                key = moment(d.date).format('MMM YYYY');
                break;
            case 'hourly':
                key = moment(d.date).format('MMM DD HH:00');
                break;
            default:
                key = moment(d.date).format('MMM DD');
                break;
        }

        if (!groupedData[key]) {
            groupedData[key] = { ...d, value: 0 };
        }
        groupedData[key].value += d.value;
    });

    return Object.values(groupedData);
};


  
  const formatYAxis = (tick: number) => {
    // Formats the tick values as millions ('M') for better readability
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    notation: 'compact', // Use compact notation
    compactDisplay: 'short' // Use short form for compact notation
  }).format(tick);
};

  <YAxis width={80} tickFormatter={formatYAxis} />

// Function to apply search and other filters to the data
const applyFilters = (data: Transaction[]) => {
  if (!searchQuery) return data; // Return original data if no search query
    return data.filter(t => t.from_address?.includes(searchQuery) || t.to_address?.includes(searchQuery));

    // let filteredData = data;
    // // Filter by searchQuery, and others if necessary
    // if (searchQuery) {
    //   filteredData = filteredData.filter(
    //     t => t.from_address?.includes(searchQuery) || t.to_address?.includes(searchQuery)
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
          <p>{`Value: $${data.value.toLocaleString('en-US')}`}</p>
          <p>{`From: ${data.from_address}`}</p>
          <p>{`To: ${data.to_address}`}</p>
          {/* ... other info */}
        </div>
      );
    }
    return null;
  };

  const filteredDataWithRequiredProps = filteredData.map((d): Transaction => ({
    block_timestamp: d.rawDate,
    date: d.formattedDate, 
    //rawDate: d.rawDate,
    //formattedDate: moment(d.rawDate).isValid() ? moment(d.rawDate).format('MMM DD') : 'Invalid date',
    value: d.value,
    // Add default or actual values for fromAddress and toAddress if needed
    from_address: d.from_address ?? 'N/A', // Use nullish coalescing to provide a default
    to_address: d.to_address ?? 'N/A',
  }));

  const calculateStartTime = () => {
    switch (timeRange) {
      case '1Y': return moment().subtract(1, 'years').startOf('day').valueOf();
      case '6M': return moment().subtract(6, 'months').startOf('day').valueOf();
      case '90D': return moment().subtract(90, 'days').startOf('day').valueOf();
      case '30D': return moment().subtract(30, 'days').startOf('day').valueOf();
      case '1D': return moment().subtract(1, 'days').startOf('day').valueOf();
      case 'Select Date':
        return selectedDate ? moment(selectedDate).startOf('day').valueOf() : moment().startOf('day').valueOf();
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
      block_timestamp: t.block_timestamp,
      date: moment(t.block_timestamp).format('YYYY-MM-DD'),  // Standardizing date format
      value: t.decimal_value,
      from_address: t.from_address ?? 'N/A',
      to_address: t.to_address ?? 'N/A',
    }));

    const timeFilteredData = transactions.filter(t => {
      const date = moment(t.block_timestamp).valueOf();
      return date >= startTime && date <= endTime;
    });

    const searchFilteredData = searchQuery ? timeFilteredData.filter(t => 
      t.from_address.includes(searchQuery) || t.to_address.includes(searchQuery)
    ) : timeFilteredData;

    setProcessedData(searchFilteredData);
  }, [walletData, timeRange, selectedDate, searchQuery]);

  const handleTimeScaleChange = (event: SelectChangeEvent) => {
    setTimeScale(event.target.value as string);
    const newData = getFilteredDataByTimeScale(filteredDataWithRequiredProps, event.target.value);
    // setProcessedData(newData);
  };

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
  
  // Function to render each filter UI
  const renderFilter = (filter, index) => (
    <div key={filter.id} className="filter-set">
      <div className="filter-block">
        <FormControl variant="outlined" margin="dense" fullWidth>
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
  

  const renderDatePicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                svg: { color: 'white' },
                input: { color: 'white' },
                label: { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white'
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  };



  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value as string);
  };

  // Choose what data from wallet is displayed on graph 
  const handleChartChange = (event: SelectChangeEvent<string>) => {
    setChartType(event.target.value as string);
  };

  return (
    <div className="graph-container" style={{ minHeight: `${dynamicHeight}px` }}>
      <Stack spacing={2} direction="column">
      <div className="filters-container">

          <Select
            label="Select Chart Type"
            value={chartType}
            onChange={handleChartChange}
            style={{ width: 'auto', flexGrow: .1, marginLeft: '-10px', marginTop: '1px'}} 
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
            <MenuItem value="Transactions">Transactions</MenuItem>
            <MenuItem value="Token transfers">Token transfers</MenuItem>
            <MenuItem value="NFT transfers">NFT transfers</MenuItem>
            <MenuItem value="Transaction volume USD">Transaction volume USD</MenuItem>
            <MenuItem value="Token transaction volume">Token transaction volume</MenuItem>
            <MenuItem value="Transactions per hour">Transactions per hour</MenuItem>
            <MenuItem value="Gas fees USD">Gas fees USD</MenuItem>
          </Select> 

        <TextField
          id="search-input"
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange} 
          size="medium"
          className="filter-input"
          style={{ width: 'auto', maxWidth: '200px', flexGrow: 1 }} 
          InputLabelProps={{
            style: { color: 'grey', fontSize: '1rem' , height: '30px'}, // Set the color and size of the label
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

        <Stack marginRight="50px" marginTop='7px' spacing={2} direction="column" sx={{ minWidth: 550 }}>
            <Button variant="outlined" onClick={addFilter}>+ Add Filter</Button>
            <div className="filter-row">
            {filters.map((filter, index) => renderFilter(filter, index))}
          </div>
          </Stack>
      </div>


      {/* Time Range Buttons */}
      <div  style={{ display: 'flex', 
                     justifyContent: 'flex-end',
                     marginRight: '5px'}} 
                     >
                        <FormControl variant="outlined" style={{ minWidth: 120, color: 'white' }}>
  <InputLabel style={{ color: 'white' }}>Time Scale</InputLabel>
  <Select
    value={timeScale}
    onChange={handleTimeScaleChange}
    label="Time Scale"
    
    style={{ color: 'white' , height: '41px', borderColor: 'grey'}}
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
           <LocalizationProvider dateAdapter={AdapterMoment}>
          {timeRanges.map(range => (
             range !== 'Select Date' ? (
            <Button
              key={range}
              variant={timeRange === range ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setTimeRange(range)}
              style={{
                marginLeft: 4,
                backgroundColor: timeRange === range ? '#ff69b480' : 'transparent', // pink when selected
                color: timeRange === range ? 'white' : 'pink', // text white when selected, otherwise pink
                border: `1px solid ${timeRange === range ? '#e76772' : '#e76772'}`, // border color changes when selected
                fontSize: '16px',
                height:'40px',
                minWidth: '2px'

            }}
            >
              {range}
            </Button>
            ) : (
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...renderDatePicker()}
                      {...params}
                      InputLabelProps={{
                        ...params.InputLabelProps,
                        style: { color: 'white' }, // Set the color of the label
                      }}
                      InputProps={{
                        ...params.InputProps,
                        style: { color: 'white' }, // Set the color of the input text
                        endAdornment: (
                          <React.Fragment>
                            {params.InputProps.endAdornment}
                            <IconButton>
                              <DateRangeIcon style={{ color: 'white' }} /> {/* Adjust the icon color here */}
                            </IconButton>
                          </React.Fragment>
                        ),
                      }}
                      style={{
                        borderColor: 'white', // Set border color
                        // Additional styles...
                      }}
                    />
                  )}
                  // ... other props you need
                />
              )
    ))}
    </LocalizationProvider>
  </div>
      <ResponsiveContainer width="100%" height={400} >
      {filteredDataWithRequiredProps.length > 0 ? (
        <LineChart data={processedData} margin={{ top: 5, right: 15, left: 15, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" color='white' tick={{ fill: 'white' }}/>
          <YAxis width={80} tickFormatter={tick => `$${tick.toFixed(2)}`} tick={{ fill: 'white' }}/>
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="red"/>
        </LineChart>
        ) : (
            <div className="no-data-message">No Data To Display</div>
            
          )}
      </ResponsiveContainer>
      </Stack>
    </div>
  );
};

export default MultipleWalletFilterGraph;