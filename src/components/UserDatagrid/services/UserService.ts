import axios from "axios";
//utils
import { API_URL } from "../utils/UserConstants";

export type User = {
    id: number;
    name: string;
    age: number;
    city: string;
    country?: string;
};

export const getUsersInfinite = async (
    startRow: number,
    endRow: number,
    sortModel?: any[],
    filterModel?: any
): Promise<{ rows: User[]; lastRow: number }> => {
    try {
        let isFilterOn = false;
        let totalCount = 0;
        const params: any = {
            _start: startRow,
            _limit: endRow,
        };

        // NOTE : Handle Sorting - DESC not working properly
        // https://github.com/typicode/json-server/issues/1496
        if (sortModel && sortModel.length > 0) {
            params._sort = sortModel.map((s) => s.colId).join(",");
            params._order = sortModel.map((s) => s.sort.toUpperCase()).join(",");
        }

        // Handle Filtering
        // NOTE : Focus on equals only. Contains not working properly
        if (filterModel) {
            Object.keys(filterModel).forEach((key) => {
                const filter = filterModel[key];
                if (filter.filter !== undefined && filter.filter !== null) {
                    if (filter.filterType === "text") {
                        if (filter.type === "contains") {
                            params[`${key}_like`] = filter.filter.trim();
                        } else if (filter.type === "equals") {
                            params[key] = filter.filter.trim();
                        }
                    } else if (filter.filterType === "number") {
                        params[key] = filter.filter.trim();
                    }
                }
            });

            if (Object.keys(filterModel).length > 0) {
                isFilterOn = true;
            }
        }


        // Fetch Data
        const response = await axios.get(API_URL, { params });
        if (isFilterOn) {
            totalCount = response.data.length;
        } else {
            const response = await axios.get(`${API_URL}`);
            totalCount = response.data.length;
        }

        return {
            rows: response.data,
            lastRow: totalCount,
        };
    } catch (error) {
        throw error;
    }
};


export const addUser = async (user: User): Promise<User> => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (
    userId: string,
    updatedUser: Omit<User, "id">
): Promise<User> => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, updatedUser);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (
    userId: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async (
): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};