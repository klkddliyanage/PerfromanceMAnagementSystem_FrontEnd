import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './AddEmployeeForm';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import './MainPage.css';
import EmployeeCard from './EmplyeeCard';
import axios from 'axios';


interface Employee {
    id: number;
    fullName: string;
    department: string;
  }

function MainPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://localhost:7052/api/employees/employees');
  
      const data = response.data;
  
      // Safely extract $values
      const extractedEmployees = data?.value?.$values;
  
      if (Array.isArray(extractedEmployees)) {
        setEmployees(extractedEmployees);
      } else {
        console.error('Invalid employee array structure:', data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  
  
  useEffect(() => {
    fetchEmployees();
  }, []);
  




  return (
    <>
        <div className='add-employee-button'>
        <Button variant="contained" onClick={handleOpen}>
            Add an Employee
        </Button>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Employee</DialogTitle>

            <DialogContent>
            <AddEmployeeForm onSuccess={() => {handleClose(); fetchEmployees(); }} />
            </DialogContent>

            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </div>
        <div>
        <Typography variant="h4" component="h1" gutterBottom>
          Employee List
        </Typography>

        <div className="employee-list">
            {Array.isArray(employees) && employees.length > 0 ? (
            employees.map((employee) => (
                <div key={employee.id} className="employee-card">
                <EmployeeCard employee={employee} onSuccess={fetchEmployees} />
                </div>
            ))
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="200px">
              <Typography variant="h6" color="text.secondary">
                No employees found.
              </Typography>
            </Box>
            )}
        </div>
        </div>
    </>
  );
}

export default MainPage;
