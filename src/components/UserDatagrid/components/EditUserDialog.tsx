"use client";

import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { User } from "../services/UserService";

export interface EditUserFormValues {
    id?: number;
    name: string;
    age: number;
    city: string;
    country: string;
}

interface EditUserDialogProps {
    open: boolean;
    action: "add" | "edit" | null;
    user: User | null;
    onClose: () => void;
    onSave: (values: EditUserFormValues) => Promise<void> | void;
}

const EditUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
        .typeError("Age must be a number")
        .required("Age is required")
        .min(1, "Age must be greater than 0"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
});

const EditUserDialog: React.FC<EditUserDialogProps> = ({
    open,
    action,
    user,
    onClose,
    onSave,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{action === "add" ? "Add User" : "Edit User"}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        id: user?.id,
                        name: user?.name || "",
                        age: user?.age || 0,
                        city: user?.city || "",
                        country: user?.country || "",
                    }}
                    validationSchema={EditUserSchema}
                    onSubmit={async (
                        values: EditUserFormValues,
                        { setSubmitting }: FormikHelpers<EditUserFormValues>
                    ) => {
                        await onSave(values);
                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isSubmitting,
                    }) => (
                        <Form>
                            {/* Hidden input for the id */}
                            <input type="hidden" name="id" value={values.id || ""} />
                            <TextField
                                margin="dense"
                                label="Name"
                                name="name"
                                fullWidth
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.name && errors.name)}
                                helperText={
                                    touched.name && typeof errors.name === "string"
                                        ? errors.name
                                        : undefined
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Age"
                                name="age"
                                type="number"
                                fullWidth
                                value={values.age}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.age && errors.age)}
                                helperText={
                                    touched.age && typeof errors.age === "string"
                                        ? errors.age
                                        : undefined
                                }
                            />
                            <TextField
                                margin="dense"
                                label="City"
                                name="city"
                                fullWidth
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.city && errors.city)}
                                helperText={
                                    touched.city && typeof errors.city === "string"
                                        ? errors.city
                                        : undefined
                                }
                            />
                            <TextField
                                margin="dense"
                                label="Contry"
                                name="country"
                                fullWidth
                                value={values.country}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.country && errors.country)}
                                helperText={
                                    touched.country && typeof errors.country === "string"
                                        ? errors.country
                                        : undefined
                                }
                            />
                            <DialogActions sx={{ mt: 2, p: 0 }}>
                                <Button onClick={onClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary" disabled={isSubmitting}>
                                    {action === "add" ? "Add" : "Save"}
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default EditUserDialog;
