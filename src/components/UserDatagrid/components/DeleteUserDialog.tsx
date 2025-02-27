"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

interface DeleteUserDialogProps {
    open: boolean;
    userName: string;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, userName, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete <strong>{userName}</strong>?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteUserDialog;
