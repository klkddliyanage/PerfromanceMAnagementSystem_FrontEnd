import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Stack, Dialog, DialogTitle, Button } from '@mui/material';
import axios from 'axios';
import EditGoalForm from './EditGoalForm';

type GoalStatus = 'NotStarted' | 'InProgress' | 'Completed' | 'Cancelled';

type GoalCardProps = {
  goal: {
    readonly  id: number;
    readonly  goalTitle: string;
    readonly  description: string;
    readonly  dueDate: string;
    readonly  status: GoalStatus;
  };
  readonly  employeeId: number;
  readonly  onSuccess: () => void; 
  readonly  goalId: number
};

function GoalCard({ goal, employeeId, onSuccess, goalId }: GoalCardProps) {

  const [open, setOpen] = useState(false);
  const getStatusColor = (status: GoalStatus) => {
    switch (status) {
      case 'NotStarted':
        return 'default';     
      case 'InProgress':
        return 'info';        
      case 'Completed':
        return 'success';     
      case 'Cancelled':
        return 'error';       
      default:
        return 'default';
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7052/api/PerfromanceGoal/employees/${employeeId}/goals/${goal.id}`);
      // onSuccess(); // Call the onSuccess function after successful deletion
      console.log('Goal deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    onSuccess(); 
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{goal.goalTitle || 'No title'}</Typography>
          <Chip label={goal.status} color={getStatusColor(goal.status)} />
        </Stack>
        <Typography variant="body2" sx={{ marginTop: 1 }}>
          {goal.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: 1 }}>
          Due: {new Date(goal.dueDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <Button
        variant="outlined"
        color="error"
        onClick={handleDelete}
        style={{ marginBottom: '1rem', marginLeft: '1rem' }}
      >
        Delete Goal
      </Button>
      <Button variant="contained" onClick={() => setOpen(true)} style={{ marginBottom: '1rem', paddingLeft: '1rem', marginLeft: '1rem' }}>
          Edit Goal
        </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Goal</DialogTitle>
            <EditGoalForm employeeId={employeeId} onClose={() => setOpen(false)} goalId={goalId} onSuccess={onSuccess}/>
          </Dialog>
    </Card>
  );
}

export default GoalCard;
