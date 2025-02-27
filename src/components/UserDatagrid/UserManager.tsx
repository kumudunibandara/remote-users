"use client";

import { useRef, useState } from "react";
import { Typography, Button, Box, Card, CardContent, Stack } from "@mui/material";
import UserDataGrid from "./components/UserDataGrid";
import EditUserDialog, { EditUserFormValues } from "./components/EditUserDialog";
import { ALERT_TYPE, USERS_ERROR_MSG, USERS_LABELS, USERS_SUCCESS_MSG } from "./utils/UserConstants";
import { deleteUser, updateUser, addUser, getAllUsers } from "./services/UserService";
import DeleteUserDialog from "./components/DeleteUserDialog";
import { AgGridReact } from "ag-grid-react";
import AlertManager from "./components/AlertManager";
import { useDispatch } from "react-redux";
import { setError, clearError } from "hostApp/ErrorHandler";

const UserManager = () => {
    const [deletingUser, setDeletingUser] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<{ action: "add" | "edit" | null, user: any }>({ action: null, user: null });
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [gridKey, setGridKey] = useState<string>('');
    const [alert, setAlert] = useState<{ message: string; type: ALERT_TYPE }>({ message: "", type: ALERT_TYPE.INFO });
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const showAlert = (message: string, type: ALERT_TYPE) => {
        setAlert({ message, type });
        setOpen(true);
    };


    const gridRef = useRef<AgGridReact>(null);

    const onEditHandler = (rowData: any) => {
        setIsDialogOpen({ action: "edit", user: rowData });
    };

    const onDeleteHandler = (rowData: any) => {
        setIsOpenDelete(true);
        setDeletingUser(rowData);
    };

    const refreshGrid = () => {
        setGridKey(`grid-key-${Math.random()}`);
    };

    const confirmDelete = async () => {
        if (deletingUser) {
            try {
                await deleteUser(deletingUser.id);
                showAlert(USERS_SUCCESS_MSG.USER_DELETE, ALERT_TYPE.SUCCESS);
                refreshGrid();
            } catch (error) {
                dispatch(setError({ message: USERS_ERROR_MSG.USER_DELETE, code: 500 }));
            }
        }
        setDeletingUser(null);
        setIsOpenDelete(false);
    };

    const onSave = async (values: EditUserFormValues) => {
        if (isDialogOpen.action === "edit" && isDialogOpen.user) {
            try {
                const updatedUser = await updateUser(values.id.toString(), values);
                showAlert(USERS_SUCCESS_MSG.USER_UPDATE, ALERT_TYPE.SUCCESS);
            } catch (error) {
                dispatch(setError({ message: USERS_ERROR_MSG.USER_UPDATE, code: 500 }));
            }
        } else if (isDialogOpen.action === "add") {
            try {
                // Retrieve all users
                const allUsers = await getAllUsers();
                const usersArray = Array.isArray(allUsers) ? allUsers : [];
                const lastUser = usersArray[usersArray.length - 1];
                const newId = lastUser ? Number(lastUser.id) + 1 : 1;

                // Send new user with the generated id
                await addUser({ id: newId, name: values.name, age: values.age, city: values.city, country: values.country });
                showAlert(USERS_SUCCESS_MSG.USER_ADD, ALERT_TYPE.SUCCESS);
            } catch (error) {
                dispatch(setError({ message: USERS_ERROR_MSG.USER_ADD, code: 500 }));
            }
        }
        refreshGrid();
        setIsDialogOpen({ action: null, user: null });
    };

    return (


        <Card variant="outlined" sx={{ width: '100%' }}>
            <AlertManager message={alert.message} type={alert.type} open={open} onClose={() => setOpen(false)} />
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {USERS_LABELS.USER_LIST}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => setIsDialogOpen({ action: "add", user: null })}>
                        Add User
                    </Button>
                </Box>
                <Stack sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Users are located different cities
                    </Typography>
                    <UserDataGrid onEditHandler={onEditHandler}
                        onDeleteHandler={onDeleteHandler}
                        gridRef={gridRef}
                        gridKey={gridKey} />
                    <EditUserDialog
                        open={Boolean(isDialogOpen.action)}
                        action={isDialogOpen.action}
                        user={isDialogOpen.user}
                        onClose={() => setIsDialogOpen({ action: null, user: null })}
                        onSave={onSave}
                    />
                    <DeleteUserDialog
                        open={isOpenDelete}
                        userName={deletingUser?.name || ""}
                        onClose={() => setIsOpenDelete(false)}
                        onConfirm={confirmDelete}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default UserManager;


