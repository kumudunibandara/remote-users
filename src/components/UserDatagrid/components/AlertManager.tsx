import * as React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ALERT_TYPE } from "../utils/UserConstants";

type AlertManagerProps = {
    message: string;
    type: ALERT_TYPE;
    open: boolean;
    onClose: () => void;
};

const AlertManager: React.FC<AlertManagerProps> = ({ message, type, open, onClose }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertManager;
