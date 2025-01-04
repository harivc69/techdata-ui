import React, { useState, useEffect } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import { DataGrid } from '@mui/x-data-grid';

const ViewDetailsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const API_ENDPOINT = 'http://localhost:5000/api/forms';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setFilteredData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (value) => {
    const filtered = userData.filter((item) =>
      item.mobileNumber.includes(value) ||
      item.technicianName.toLowerCase().includes(value.toLowerCase()) ||
      item.customerName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date / تاريخ', width: 150 },
    { field: 'technicianName', headerName: 'Technician Name / اسم الفني', width: 200 },
    { field: 'customerName', headerName: 'Customer Name / اسم العميل', width: 200 },
    { field: 'amount', headerName: 'Amount / مبلغ', width: 120 },
    { field: 'mobileNumber', headerName: 'Mobile Number / رقم الجوال', width: 180 },
    { field: 'address', headerName: 'Address / عنوان', width: 250 },
    { field: 'description', headerName: 'Description / وصف', width: 250 },
    // { field: 'status', headerName: 'Status / حالة', width: 150 },
  ];

  return (
    <Box sx={styles.container}>
      <Box sx={styles.searchContainer}>
        <TextField
          label="Search / يبحث"
          value={searchTerm}
          onChange={handleSearchInputChange}
          sx={styles.input}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon sx={styles.icon} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredData.length > 0 && (
        <Box sx={styles.dataGridContainer}>
          <DataGrid
            rows={filteredData.map((item, index) => ({ id: index + 1, ...item }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={styles.dataGrid}
          />
        </Box>
      )}
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    backgroundColor: '#f0f4f9', // Light green background
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
  
    marginRight: '15px',
    flex: 1,
  },
  icon: {
    color: '#c2c2c2', // Green color for icon
  },
  dataGridContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff', // White background for data grid
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)', // Light gray shadow
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  dataGrid: {
    height: 'calc(100vh - 120px)',
    width: '100%',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#4caf50', // Green header
      color: '#000',
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-row:nth-of-type(odd)': {
      backgroundColor: '#f5f5f5', // Light gray rows
    },
    '& .MuiDataGrid-row:nth-of-type(even)': {
      backgroundColor: '#ffffff', // White rows
    },
    '& .MuiDataGrid-cell': {
      padding: '10px',
      fontSize: '14px',
    },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: '#d3e3fd', // Green footer
    },
    overflow: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#c2c2c2 #fff',
  },
  '@global': {
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: '#fff',
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#d3e3fd', // Green scrollbar thumb
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#f0f4f9', // Darker green on hover
    },
  },
};

export default ViewDetailsPage;
