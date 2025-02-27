"use client";
//UI
import { LicenseManager } from "ag-grid-enterprise";
//services
import { getUsersInfinite } from "../services/UserService";

import React, {
    useCallback,
    useMemo,
    useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
    ColDef,
    GridReadyEvent,
    IServerSideDatasource,
    ModuleRegistry,
    NumberFilterModule,
    TextFilterModule,
    ValidationModule,
} from "ag-grid-community";
import {
    RowGroupingModule,
    ServerSideRowModelModule,
    ServerSideRowModelApiModule,
} from "ag-grid-enterprise";
import ActionsRenderer from "./ActionRenderere";

// Add the AG Grid License Key for use enterprise features, such as Server-Side Row Modelfree
LicenseManager.setLicenseKey("[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-076337}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 March 2025}____[v3]_[0102]_MTc0MTkxMDQwMDAwMA==f7c8723db6b2e4c55a843f86bf24e52d");

ModuleRegistry.registerModules([RowGroupingModule,
    ServerSideRowModelModule,
    ServerSideRowModelApiModule,
    TextFilterModule,
    NumberFilterModule,
    ValidationModule]);


export type UserDataGridType = {
    gridRef: React.RefObject<AgGridReact>;
    onEditHandler: (id: number) => void;
    onDeleteHandler: (id: number) => void;
    gridKey: string;
}
const UserDataGrid = ({ onEditHandler, onDeleteHandler, gridRef, gridKey }: UserDataGridType) => {
    const gridContainerRef = useRef<HTMLDivElement>(null);
    const gridStyle = useMemo(() => ({
        height: "500px",
        width: "100%",
        overflowX: "auto" as "auto",
    }), []);
    const rowSelection = "multiple";

    const columnDefs = useMemo(
        () => [
            {
                headerName: "Actions",
                cellRenderer: ActionsRenderer,
                cellRendererParams: {
                    onEdit: onEditHandler,
                    onDelete: onDeleteHandler,
                },
                filter: false,
                sortable: false,
                width: 100,
            },
            { field: "id", filter: "agNumberColumnFilter", sortable: true },
            { field: "name", filter: "agTextColumnFilter", sortable: true },
            { field: "age", filter: "agNumberColumnFilter", sortable: true },
            { field: "city", filter: "agTextColumnFilter", sortable: true },
            { field: "country", filter: "agTextColumnFilter", sortable: true },

        ],
        [onEditHandler, onDeleteHandler]
    );
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            floatingFilter: true,
            flex: 1,
            minWidth: 120,
        };
    }, []);



    const createServerSideDatasource = useCallback((): IServerSideDatasource => {
        return {
            getRows: async (params) => {
                try {
                    const { startRow, endRow, sortModel, filterModel } = params.request;
                    const users = await getUsersInfinite(startRow, endRow, sortModel, filterModel);
                    params.success({ rowData: users.rows, rowCount: users.lastRow });
                } catch (error) {
                    params.fail();
                }
            },
        };
    }, [gridKey]);

    const onGridReady = useCallback((params: GridReadyEvent) => {

        if (gridRef.current) {
            gridRef.current.api = params.api;
        }
        const datasource = createServerSideDatasource();
        params.api!.setGridOption("serverSideDatasource", datasource);
    }, [createServerSideDatasource]);


    const clearFilters = () => {
        gridRef.current?.api?.setFilterModel(null);
    };

    return (

        <div style={gridStyle} ref={gridContainerRef}>
            <AgGridReact
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowModelType={"serverSide"}
                rowSelection={rowSelection}
                suppressAggFuncInHeader={true}
                onGridReady={onGridReady}
                pagination={false}
                cacheBlockSize={20}
                key={gridKey}
            />
        </div>

    );
};

export default UserDataGrid;
