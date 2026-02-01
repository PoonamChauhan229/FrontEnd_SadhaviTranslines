import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../utils/constants";
import usePagination from "../../utils/usePagination";
import * as XLSX from "xlsx";

import LRCopiesHeader from "./LRCopiesHeader";
import LRCopiesFilters from "./LRCopiesFilters";
import LRCopiesTable from "./LRCopiesTable";
import LRCopiesPagination from "./LRCopiesPagination";

const ViewLRCopies = () => {
  const [lrList, setLrList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [lrNo, setLrNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ---------- Fetch LRs ---------- */
useEffect(() => {
  axios.get(`${url}/get-lrs`).then((res) => {
    const data = res.data?.lrs || [];
    setLrList(data);
    setFiltered(data);
  });
}, []);


  /* ---------- Download LR ---------- */
  const downloadLR = async (lrId, color) => {
    try {
      const res = await axios.get(
        `${url}/download-lr/${lrId}/${color}`,
        { responseType: "blob" }
      );

      const blobUrl = window.URL.createObjectURL(res.data);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${color}-${lrId}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to download LR");
    }
  };

  /* ---------- Filters ---------- */
  const applyFilters = (e) => {
    e.preventDefault();
    let data = [...lrList];

    if (lrNo)
      data = data.filter((i) =>
        i.lrNo?.toLowerCase().includes(lrNo.toLowerCase())
      );

    if (vehicleNo)
      data = data.filter((i) =>
        i.lrVehicleNo?.toLowerCase().includes(vehicleNo.toLowerCase())
      );

    if (fromDate)
      data = data.filter((i) => new Date(i.lrDate) >= new Date(fromDate));

    if (toDate)
      data = data.filter((i) => new Date(i.lrDate) <= new Date(toDate));

    setFiltered(data);
    goToPage(1);
  };

  /* ---------- Export ---------- */
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LR Copies");
    XLSX.writeFile(wb, "lr_copies.xlsx");
  };

  const { paginatedData, currentPage, totalPages, goToPage } =
    usePagination(filtered, 5);

  return (
    <div className="p-4">
      <LRCopiesHeader exportToExcel={exportToExcel} />

      <LRCopiesFilters
        lrNo={lrNo}
        vehicleNo={vehicleNo}
        fromDate={fromDate}
        toDate={toDate}
        setLrNo={setLrNo}
        setVehicleNo={setVehicleNo}
        setFromDate={setFromDate}
        setToDate={setToDate}
        applyFilters={applyFilters}
      />

      <LRCopiesTable
        paginatedData={paginatedData}
        currentPage={currentPage}
        onDownload={downloadLR}
        onDeleteSuccess={(id) =>
          setFiltered((prev) => prev.filter((lr) => lr._id !== id))
        }
      />

      <LRCopiesPagination
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default ViewLRCopies;
