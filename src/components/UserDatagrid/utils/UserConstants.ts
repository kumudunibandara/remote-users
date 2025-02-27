
export const USERS_LABELS = {
    USER_LIST: 'Users List',
    CLEAR_FILTERS: 'Clear Filters',
    WELCOME_MSG: 'Welcome to the user management system!',
};

export const USERS_ERROR_MSG = {
    USER_GET: 'Error fetching users',
    USER_UPDATE: 'Error updating user',
    USER_ADD: 'Error adding user',
    USER_DELETE: 'Error deleting user',
};

export const USERS_SUCCESS_MSG = {
    USER_GET: 'Successfully fetching users',
    USER_UPDATE: 'Successfully updating user',
    USER_ADD: 'Successfully adding user',
    USER_DELETE: 'Successfully deleting user',
};

export enum ALERT_TYPE {
    ERROR = 'error',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
};


export const API_URL = "http://localhost:5000/users"; // Mock API URL