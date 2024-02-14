"use client";
import { useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Home = () => {
  const [pdfData, setPdfData] = useState<Blob | null>(null);

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("api/");
      const blob = new Blob([data], { type: "application/pdf" });

      //Para Ler o Binario PDF****************************************
      // const reader = new FileReader();
      // reader.onload = function (event: any) {
      //   const content = event.target.result;
      //   console.log("Conteúdo do Blob:", content);
      // };
      // reader.readAsText(blob);
      //Para Ler o Binario PDF****************************************

      setPdfData(blob);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div>
      <button
        type="button"
        onClick={fetchData}
        className="bg-slate-700 p-4 rounded-lg hover:opacity-75 text-white"
      >
        Baixar Pdf
      </button>
      {pdfData && (
        <>
          <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </>
      )}
    </div>
  );
};
export default Home;
