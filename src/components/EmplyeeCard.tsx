import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

type EmployeeCardProps = {
  readonly  employee: {
    readonly  id: number;
    readonly  fullName: string;
    readonly  department: string;
  };
  readonly  onSuccess: () => void;
};


function EmployeeCard({ employee, onSuccess }: EmployeeCardProps) {

    const handleDelete = async (id: number) => {
        try {
          await axios.delete(`https://localhost:7052/api/employees/employees/${id}`);
          onSuccess(); // Call the onSuccess function after successful deletion
          console.log('Employee deleted successfully');
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      };

      const navigate = useNavigate();

      const handleClick = () => {
        navigate("/Goals", { state: { employeeId: employee.id } });
      };
    
  

  return (
    <Card sx={{ marginBottom: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6">Full Name: {employee.fullName}</Typography>
        <Typography variant="body2">Department: {employee.department}</Typography>

        <div style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="error" style={{ marginRight: '10px' }} onClick={() => handleDelete(employee.id)}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={handleClick}>
            View Goals
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EmployeeCard;
