import React,{ useState } from 'react'
import { Button, TextField, DialogActions, Stack, FormControl,  MenuItem, Select, InputLabel } from '@mui/material';
import axios from 'axios';

type AddGoalFormProps = Readonly<{
  employeeId: number;
  onSuccess: () => void;
  onClose: () => void;
}>;

function AddGoalForm({ employeeId, onSuccess, onClose }: AddGoalFormProps) {
    const [goalTitle, setGoalTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('NotStarted');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          await axios.post(
            `https://localhost:7052/api/PerfromanceGoal/employees/${employeeId}/goals`,
            {
              goalTitle,
              description,
              dueDate,
              status,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          onSuccess();
          onClose();
        } catch (error) {
          console.error('Error adding goal:', error);
        }
      };
    
  return (
    
    <div>
        <form onSubmit={handleSubmit}>

        <Stack spacing={2}>
        <TextField
            label="Goal Title"
            fullWidth
            required
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
        />

        <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
            label="Due Date"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
        />

        <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            >
            <MenuItem value="NotStarted">Not Started</MenuItem>
            <MenuItem value="InProgress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
        </FormControl>

        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Add Goal</Button>
        </DialogActions>
        </Stack>

        </form>
    </div>
  )
}

export default AddGoalForm