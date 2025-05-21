"use client";
import HistoryIcon from "@mui/icons-material/History";
import { Box, Button, IconButton } from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
  type MRT_RowSelectionState,
  type MRT_Row,
} from "material-react-table";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv"; //or use your library of choice here
import { makeData, type Project } from "@/app/history/makeData";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
  filename: "ExportedData",
});

const flattenProject = (project: Project) => ({
  id: project.id,
  name: project.name,
  sandStoneCount: project.sandStoneCount,
  sandStoneCoverage: project.sandStoneCoverage,
  siltStoneCount: project.siltStoneCount,
  siltStoneCoverage: project.siltStoneCoverage,
  postDate: project.postDate,
});

export default function HistoryResult() {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      {
        id: "rowNumber",
        header: "No",
        size: 50,
        Cell: ({ row }) => row.index + 1,
        enableSorting: false,
        enableColumnFilter: false,
      },
      { accessorKey: "postDate", header: "Date", size: 200 },
      { accessorKey: "name", header: "Project Name", size: 200 },
    ],
    []
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  //using state if you want to manage the pagination state yourself
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15, //customize the default page size
  });
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({}); //ts type available

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("access_token");
        console.log(token);
        const response = await fetch("http://127.0.0.1:5000/projects", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const handleExportRows = (rows: MRT_Row<Project>[]) => {
    const rowData = rows.map((row) => flattenProject(row.original));
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const flatData = data.map(flattenProject);
    const csv = generateCsv(csvConfig)(flatData);
    download(csvConfig)(csv);
  };

  const router = useRouter();
  const renderRowActions = ({ row }: { row: MRT_Row<Project> }) => (
    <Box>
      <IconButton
        color="primary"
        onClick={() => {
          const projectId = row.original.id;
          router.push(`/detail/${projectId}`);
        }}
      >
        <VisibilityIcon />
      </IconButton>
      <IconButton color="error" onClick={() => console.info("Delete")}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const table = useMaterialReactTable({
    columns,
    data, //100 rows
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: true,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: true,
    enableRowSelection: true,
    enableBatchRowSelection: true,
    enableRowVirtualization: true,
    onRowSelectionChange: setRowSelection,
    positionToolbarAlertBanner: "bottom",
    muiTableContainerProps: { sx: { maxHeight: "600px" } },
    onSortingChange: setSorting,
    state: { isLoading, sorting, pagination, rowSelection },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
    enableGlobalFilter: false,
    enableColumnFilters: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableHiding: false, // (opsional) agar kolom tidak bisa disembunyikan via config
    enableColumnPinning: false,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
    renderRowActions,
    enableRowActions: true,
    positionActionsColumn: "last",
  });

  return (
    <div className="bg-[#F4F4F4] p-10">
      <div className="flex items-center text-5xl font-bold text-[var(--biru-dua)]">
        <HistoryIcon sx={{ fontSize: 64 }} />
        <span className="ml-4">History Project</span>
      </div>
      <div className="bg-white rounded-lg shadow-xl mt-10 p-8">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}
