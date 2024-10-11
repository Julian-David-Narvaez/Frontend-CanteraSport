import useAuthToken from "../../token/useAuthToken";
import { toast } from "react-toastify";

const useDescargarUsers = () => {
    const { token } = useAuthToken();

    const handleDownloadExcel = async (search,estado) => {

      let url = `http://127.0.0.1:8000/api/exportusers`;
      const params = new URLSearchParams();
        
        if (search) {
          params.append("search", search);
        }
        if (estado) {
          params.append("estado", estado);
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
      
      
    
        try {
          const response = await fetch(
            url,{
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
              errorMessage || "No se pudo descargar el archivo Excel."
            );
          }
    
          const blob = await response.blob();
          const contentDisposition = response.headers.get("Content-Disposition");
          const fileNameMatch = contentDisposition && contentDisposition.match(/filename="?([^"]+)"?/);
          const fileName = fileNameMatch ? fileNameMatch[1] : "usuarios.xlsx";

    
          
          if (window.showSaveFilePicker) {
            const handle = await window.showSaveFilePicker({
              suggestedName: fileName,
              types: [
                {
                  description: 'Excel files',
                  accept: { 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] },
                },
              ],
            });
            const writableStream = await handle.createWritable();
            await writableStream.write(blob);
            await writableStream.close();
            toast.success("El excel se ha descargado correctamente  .");
          } else {
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success("El excel se ha descargado correctamente.");
          }
        } catch (error) {
          console.error("Error al descargar el archivo Excel:", error);
          toast.error("Hubo un problema al descargar el archivo Excel.");
        }
      };
  return { handleDownloadExcel };
}

export default useDescargarUsers
