'use client'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "./datatable.css";
import { InputSwitch, type InputSwitchChangeEvent } from 'primereact/inputswitch';
import { useState, type SetStateAction } from "react";


function Datatable({ data }: { data: any }) {
  const rowClassName = () => "custom-row";
      const [rowClick, setRowClick] = useState<boolean>(true);
        type DataItem = {
          title: string;
          place_of_origin: string;
          artist_display: string;
          date_start: string | number;
          date_end: string | number;
        };
        const [selectedProducts, setSelectedProducts] = useState<DataItem[] | null>(null);


  return (
    <div className="w-full rounded-lg  shadow bg-white flex m-0 p-0 justify-center items-center flex-col">
        <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e: InputSwitchChangeEvent) => setRowClick(e.value!)} />
                <label htmlFor="input-rowclick">Row Click</label>
        </div>


      <DataTable
        value={data.data}
        paginator
        rows={12}
        showGridlines
        rowClassName={rowClassName}
        stripedRows
        tableStyle={{ minWidth: "95vw" , minHeight: "40vh" , maxHeight: "60vh" , transform: "scale(0.9)" }}
        className="custom-table "
        selectionMode={rowClick ? undefined : 'multiple'}
        selection={selectedProducts!}
        onSelectionChange={(e: { value: SetStateAction<{ title: string; place_of_origin: string; artist_display: string; date_start: string | number; date_end: string | number; }[] | null>; }) => setSelectedProducts(e.value)}
        cellSelection={false}
        dataKey="title"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

        <Column field="title" header="Title" style={{ minWidth: "12px" }} />
        <Column field="place_of_origin" header="Origin" style={{ minWidth: "10px" }} />
        <Column field="artist_display" header="Artist" style={{ minWidth: "12px" }} />
        <Column field="date_start" header="Start" style={{ minWidth: "12px" }} />
        <Column field="date_end" header="End" style={{ minWidth: "12px" }} />
      </DataTable>
    </div>
  );
}

export default Datatable;