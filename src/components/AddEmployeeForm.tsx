import React, { useState } from 'react';
import { Button, TextField, Stack, MenuItem } from '@mui/material';
import axios from 'axios';


interface AddEmployeeFormProps {
    onSuccess: () => void;
  }

const AddEmployeeForm = ({ onSuccess }: AddEmployeeFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');


  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://localhost:7052/api/employees/employees', {
        fullName: `${firstName} ${lastName}`,
        department: department,
        performanceGoals: null,
      });
    
      if (response.status === 201 || response.status === 200) {
        onSuccess();
      } else {
        console.warn('Unexpected response status:', response.status);
      }
    
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField required
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Last Name" required
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />

        <TextField
          select required
          label="Department"
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          fullWidth
        >
          <MenuItem value="">-- Select Department --</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Legal">Legal</MenuItem>
          <MenuItem value="Operations">Operations</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Customer Service">Customer Service</MenuItem>
          <MenuItem value="Research">Research</MenuItem>
        </TextField>

        <Button type="submit" variant="contained">
          Submit
        </Button>

      </Stack>
    </form>
  );
};

export default AddEmployeeForm;
