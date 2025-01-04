import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { AddCircle, List } from '@mui/icons-material'; // Import List icon instead of Visibility

// Widget 1: Form Widget (Redirects to /adddetails)
const FormWidget = () => {
  const navigate = useNavigate();

  const handleWidgetClick = () => {
    // Redirect to /adddetails when clicked
    navigate('/adddetails');
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },
        width: 320,
        minHeight: 240,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#e3f2fd', // Light blue background
      }}
      onClick={handleWidgetClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <AddCircle sx={{ fontSize: 50, color: '#1976d2', marginBottom: 2 }} /> {/* Add Icon */}
        <Typography variant="h5" color="primary" gutterBottom>
          Enter Details
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
          Click to add your details
        </Typography>
        <Button variant="contained" color="primary">
          Go to Form
        </Button>
      </CardContent>
    </Card>
  );
};

// Widget 2: Details View Widget (Redirects to /viewdetails)
const DetailsViewWidget = () => {
  const navigate = useNavigate();

  const handleWidgetClick = () => {
    // Redirect to /viewdetails when clicked
    navigate('/viewdetails');
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },
        width: 320,
        minHeight: 240,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff3e0', // Light orange background
      }}
      onClick={handleWidgetClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <List sx={{ fontSize: 50, color: '#f57c00', marginBottom: 2 }} /> {/* List Icon */}
        <Typography variant="h5" sx={{color:'#f57c00'}} gutterBottom>
          Details View
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 2 }}>
          Click to view your details
        </Typography>
        <Button variant="contained" sx={{background:'#f57c00'}}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

// HomePage Component with clickable widgets
const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#f4f7fc',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: 4,
        }}
      >
        <FormWidget />
        <DetailsViewWidget />
      </Box>
    </Box>
  );
};

export default HomePage;
