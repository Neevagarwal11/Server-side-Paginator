import Datatable from "../component/datatable";
import axios from "axios";
import { useEffect, useState } from "react";


function Pagination() {

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(5);
  const [data, setData] = useState<any>(null);
  const API= import.meta.env.VITE_API || "Not Got API";
  // console.log(API , " <- This is API"); 



  useEffect(() => {

    const url = API.includes("page=") ? API.replace(/page=\d+/, `page=${page}`) : `${API}?page=${page}`;
    console.log(url , " <- This is URL");


    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setTotalPages(response.data.pagination.total_pages);
        console.log(response.data , " <- This is response data");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API, page]);




 if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center scale-[0.9] justify-center  w-full gap-0 p-0 overflow-hidden">
      {/* <div className="font-bold text-2xl underline">Pagination</div> */}
      <Datatable data={data} page={page}
        totalPages={totalPages}
        setPage={setPage} />
    </div>
  );
}

export default Pagination;
