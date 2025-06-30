import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StudyGroupCard = ({
  _id,
  title,
  subject,
  description,
  creatorName,
  isMember,
  onJoin,
  onLeave,
  onDelete,
}) => {
  const isDummy = _id.startsWith("d");
  const navigate = useNavigate();

  const handleJoinAndNavigate = () => {
    if (onJoin) onJoin();
    navigate(`/group/${_id}`, {
      state: {
        title,
        subject,
        description,
        groupId: _id,
      },
    });
  };

  return (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        color: "white",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Typography variant="subtitle2" color="#DDDDDD" gutterBottom>
          Subject: {subject}
        </Typography>

        <Typography variant="body2" color="#CCCCCC" gutterBottom>
          {description}
        </Typography>

        {creatorName && (
          <Typography variant="caption" color="#BBBBBB">
            Created by: {creatorName}
          </Typography>
        )}
      </CardContent>

      {!isDummy && (
        <CardActions sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
          {/* Join/Leave Button */}
          {isMember ? (
            <Button
              onClick={onLeave}
              size="small"
              variant="outlined"
              color="warning"
              sx={{
                borderColor: "#ffaa00",
                color: "#ffaa00",
                "&:hover": {
                  backgroundColor: "#ffaa00",
                  color: "white",
                },
              }}
            >
              Leave
            </Button>
          ) : (
            <Button
              onClick={handleJoinAndNavigate}
              size="small"
              variant="contained"
              color="primary"
            >
              Join
            </Button>
          )}

          {/* Delete Button */}
          {onDelete && (
            <Button
              onClick={onDelete}
              size="small"
              variant="outlined"
              color="error"
              sx={{
                borderColor: "#ff4d4d",
                color: "#ff4d4d",
                "&:hover": {
                  backgroundColor: "#ff4d4d",
                  color: "white",
                },
              }}
            >
              Delete
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default StudyGroupCard;
