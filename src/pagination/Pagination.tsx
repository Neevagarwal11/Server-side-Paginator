import Datatable from "../component/datatable";
import axios from "axios";
import { useEffect, useState } from "react";


function Pagination() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("https://api.artic.edu/api/v1/artworks?page=1")
      .then((response) => {
        setData(response.data);
        console.log(response.data , " <- This is response data");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 if (!data) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-start gap-0 p-2">
      {/* <div className="font-bold text-2xl underline">Pagination</div> */}
      <Datatable data={data} />
    </div>
  );
}

export default Pagination;
