import React, { useEffect, useState } from 'react';
import GoalCard from './GoalCard';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogTitle, Button,  Box, Typography } from '@mui/material';
import AddGoalForm from './AddGoalForm';

type GoalStatus = 'NotStarted' | 'InProgress' | 'Completed' | 'Cancelled';

interface Goals {
  id: number;
  goalTitle: string;
  description: string;
  dueDate: string;
  status: GoalStatus;
}


function Goals() {
  const location = useLocation();
  const { employeeId } = location.state as { employeeId: number };

    const [goals, setGoals] = useState<Goals[]>([]);
    const [open, setOpen] = useState(false);

    const fetchGoals = async () => {
        try {
          const response = await axios.get(`https://localhost:7052/api/PerfromanceGoal/employees/${employeeId}/goals`);
      
          const data = response.data;
      
          // Safely extract $values
          const extractedGoals = data?.value?.$values;
      
          if (Array.isArray(extractedGoals)) {
            setGoals(extractedGoals);
          } else {
            console.error('Invalid employee array structure:', data);
          }
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };
      
      
      useEffect(() => {
        fetchGoals();
      }, []);


      const navigate = useNavigate();

      const handleClick = () => {
        navigate("/");
      };

  return (
    <div>
        <div>
        <Button variant="contained" onClick={() => setOpen(true)} style={{ marginBottom: '1rem' }}>
          Add Goal
        </Button>
          <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Goal</DialogTitle>
            <AddGoalForm employeeId={employeeId} onSuccess={fetchGoals} onClose={() => setOpen(false)} />
          </Dialog>

            {goals.length === 0 ? (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="200px">
                <Typography variant="h6" color="text.secondary">
                  No Goals Found.
                </Typography>
              </Box>
            ) : (
                goals.map((goalA) => (
                <GoalCard key={goalA.id} goal={goalA} employeeId={employeeId} onSuccess={fetchGoals} goalId={goalA.id}/>
                ))
            )}
        </div>
        <Button
        variant="contained"
        color="secondary"
        onClick={handleClick}
        sx={{ mt: 2 }}
      >
        Back to Employee
      </Button>

    </div>
  );
}

export default Goals;
