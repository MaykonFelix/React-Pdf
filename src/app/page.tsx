"use client";
import axios from "axios";

const Home = () => {
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

      const url = URL.createObjectURL(blob);
      const iframe = document.getElementById("iframe") as HTMLIFrameElement;
      if (iframe) iframe.src = url;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={fetchData}
        className="p-2 text-white bg-slate-500 hover:opacity-75"
      >
        Baixar Pdf
      </button>
      <iframe className="w-96 h-[600px]" id="iframe" />
    </div>
  );
};
export default Home;
