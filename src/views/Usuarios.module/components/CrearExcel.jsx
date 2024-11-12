import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import * as XLSX from 'xlsx';
import { getData } from '../../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
const RUTA_API = import.meta.env.VITE_API_URL;

export const CrearExcel = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getData(`${RUTA_API}/api/usuarios`)
      .then(response => {
        // Asegúrate de usar 'dataResponse' para acceder a los datos
        setUsuarios(response.dataResponse);
      })
      .catch(error => toast.error( error));
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(usuarios);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
    XLSX.writeFile(wb, "Usuarios.xlsx");
  };

  return (
    <Button onClick={handleExportExcel} color="success" className="mb-4 text-white">
      Exportar  Excel
    </Button>
  );
};
