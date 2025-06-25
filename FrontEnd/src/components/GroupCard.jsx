import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions as DialogBtns } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StudyGroupCard = ({ title, subject, description, groupId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirmJoin = () => {
    setOpen(false);
    alert("✅ Successfully joined!");
    navigate(`/group/${groupId}`, {
      state: { title, subject, description },
    });
  };

  return (
    <>
      <Card
        sx={{
          width: 320,
          m: 2,
          borderRadius: 4,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 6,
          },
          backgroundColor: '#fffefc',
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#673ab7' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {subject}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="outlined" size="small" onClick={handleOpenDialog}>
            Join
          </Button>
        </CardActions>
      </Card>

      {/* Custom Join Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle sx={{ backgroundColor: 'violet', color: 'white' }}>
          Confirm Join
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f3e5f5' }}>
          <Typography>
            Do you want to join the group "<strong>{title}</strong>"?
          </Typography>
        </DialogContent>
        <DialogBtns sx={{ backgroundColor: '#f3e5f5' }}>
          <Button onClick={handleCloseDialog} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmJoin} color="primary" variant="contained">
            Yes
          </Button>
        </DialogBtns>
      </Dialog>
    </>
  );
};

export default StudyGroupCard;
