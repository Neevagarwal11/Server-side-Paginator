"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "./datatable.css";
import 'primeicons/primeicons.css';
import { Paginator } from "primereact/paginator";
import {
  InputSwitch,
  type InputSwitchChangeEvent,
} from "primereact/inputswitch";
import { useRef, useState, type SetStateAction } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";

type DatatableProps = {
  data: any;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

function Datatable({ data, page, totalPages, setPage }: DatatableProps) {
  const [jumpPage, setJumpPage] = useState<string>("");

  const rowClassName = () => "custom-row";
  const [rowClick, setRowClick] = useState<boolean>(true);
  type DataItem = {
    title: string;
    place_of_origin: string;
    artist_display: string;
    date_start: string | number;
    date_end: string | number;
  };




  const handleJump = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jumpTo = Number(jumpPage);
    if (jumpTo >= 1 && jumpTo <= totalPages) setPage(jumpTo);
    setJumpPage(""); // Clear after jump
  };

  const onPageChange = (event: { page: number }) => {
    setPage(event.page + 1);
  };

  const [selectCount, setSelectCount] = useState<number>(0);
  const overlayRef = useRef<any>(null);

  const handleChevronClick = (e: React.MouseEvent) => {
    overlayRef.current.toggle(e);
  };

const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const handleSelectRows = async () => {
  let allRows: any[] = [];
  let currentPage = 1;
  let rowsNeeded = selectCount;
  const pageSize = 12;

  while (rowsNeeded > 0 && currentPage <= totalPages) {
    let pageData =
      currentPage === page ? data.data : await fetchPage(currentPage);
    for (let row of pageData) {
      if (allRows.length < selectCount) {
        allRows.push(row);
      }
    }
    currentPage++;
    rowsNeeded = selectCount - allRows.length;
  }
  setSelectedProducts(allRows);
  overlayRef.current.hide();
};

  return (
    <div className="w-full rounded-lg bg-white flex m-0 p-0 justify-center gap-0 items-center flex-col">
      <DataTable
        value={data.data}
        rows={12}
        showGridlines
        rowClassName={rowClassName}
        stripedRows
        tableStyle={{
          width: "100vw",
          minHeight: "40vh",
          maxHeight: "60vh",
          transform: "scale(0.9)",
          border: "2px solid #ccc",
        }}
        className="custom-table "
        selectionMode={rowClick ? undefined : "multiple"}
        selection={selectedProducts!}
        onSelectionChange={(e: { value: SetStateAction<any[]>; }) => setSelectedProducts(e.value)}
        cellSelection={false}
        dataKey="id"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "10rem" }}
          // Icons for select all and dropdown
          header={(options: any) => (
            <div className="flex items-center w-[90%] absolute top-1.5 ml-8">
              {options.checkboxElement}
              <div>
                <Button
                  icon="pi pi-chevron-down"
                  className="p-button-text p-0"
                  onClick={handleChevronClick}
                  type="button"
                  aria-label="Select rows"
                />
                <OverlayPanel ref={overlayRef}>
                  <div className="flex flex-col gap-2 p-2">
                    <label htmlFor="selectCount" className="font-semibold">
                      Number of rows to select:
                    </label>
                    <input
                      id="selectCount"
                      type="number"
                      min={1}
                      max={totalPages * 12}
                      value={selectCount}
                      onChange={(e) => setSelectCount(Number(e.target.value))}
                      className="border rounded px-2 py-1"
                    />
                    <Button
                      label="Select"
                      icon="pi pi-check"
                      onClick={handleSelectRows}
                      disabled={!selectCount || selectCount < 1}
                      className="p-button-sm p-button-primary"
                    />
                  </div>
                </OverlayPanel>
              </div>
            </div>
          )}
        />

        <Column field="title" header="Title" style={{ width: "32vw" }} />
        <Column
          field="place_of_origin"
          header="Origin"
          style={{ width: "32vw", minHeight: "5vh" }}
        />
        <Column
          field="artist_display"
          header="Artist"
          style={{ width: "32vw", minHeight: "25vh" }}
        />
        <Column
          field="date_start"
          header="Start"
          style={{ width: "32vw", minHeight: "25vh" }}
        />
        <Column
          field="date_end"
          header="End"
          style={{ width: "32vw", minHeight: "5vh" }}
        />
      </DataTable>

      {/* Paginator */}

      <div className="flex items-center gap-2">
        <Paginator
          first={(page - 1) * 12}
          rows={12}
          totalRecords={totalPages * 12}
          pageLinkSize={5}
          onPageChange={onPageChange}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate={`Page ${page} of ${totalPages}`}
        />

        <form onSubmit={handleJump} className="flex items-center gap-1">
          <input
            type="number"
            name="jumpPage"
            min={1}
            max={totalPages}
            className="w-16 px-1 py-0.5 border rounded"
            placeholder="Page"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-2 py-1 bg-blue-400 text-white rounded"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
}

export default Datatable;


async function fetchPage(pageNum: number) {
  const API = import.meta.env.VITE_API || "Not Got API";
  const url = API.includes("page=")
    ? API.replace(/page=\d+/, `page=${pageNum}`)
    : `${API}?page=${pageNum}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
}
