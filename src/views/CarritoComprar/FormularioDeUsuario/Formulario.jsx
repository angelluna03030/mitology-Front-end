import { useState } from "react";
import { Input, Autocomplete, AutocompleteItem, Checkbox, Select, SelectItem } from "@nextui-org/react";
import { Departamentos } from "./informacion";
import { CarritoComprasIcono } from "./Data";
import { NumeroDocumento, validarApellidos, validarCorreo, validarNombre, validartelefono } from "./Validaciones";


export const FormularioUsuario = () => {
  const [formData, setFormData] = useState({
    correo: "",
    numeroDeCelular: "",
    nombres: "",
    apellidos: "",
    tipoDeDocumento: "",
    numeroDeDocumento: "",
    direccion: "",
    barrio: "",
    departamento: "",
    ciudad: "",
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleBlur = (field, value) => {
    let error = "";
    switch (field) {
      case "correo":
        error = validarCorreo(value);
        break;
      case "numeroDeCelular":
        error = validartelefono(value);
        break;
      case "nombres":
        error = validarNombre(value);
        break;
      case "apellidos":
        error = validarApellidos(value);
        break;
      case "numeroDeDocumento":
        error = NumeroDocumento(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  return (
    <form className="w-full max-w-lg sm:mx-10 my-4 p-6 border border-gray-300 rounded-lg shadow-lg">
      <p className="text-2xl font-semibold mx-4 my-3">Contacto</p>

      <Input
        type="email"
        label="Correo"
        variant="underlined"
        placeholder="Ingresa tu correo"
        className="w-full mb-4"
        isInvalid={!!errors.correo}
        errorMessage={errors.correo}
        value={formData.correo}
        onChange={(e) => handleChange("correo", e.target.value)}
        onBlur={(e) => handleBlur("correo", e.target.value)}
        isRequired
      />

      <Input
        type="tel"
        label="Número de celular"
        variant="underlined"
        placeholder="Ingresa tu número de celular"
        className="w-full mb-4"
        isInvalid={!!errors.numeroDeCelular}
        errorMessage={errors.numeroDeCelular}
        value={formData.numeroDeCelular}
        onChange={(e) => handleChange("numeroDeCelular", e.target.value)}
        onBlur={(e) => handleBlur("numeroDeCelular", e.target.value)}
        isRequired
      />

      <div className="flex mb-4 space-x-4">
        <Input
          type="text"
          label="Nombres"
          variant="underlined"
          placeholder="Ingresa tus nombres"
          className="w-1/2"
          isInvalid={!!errors.nombres}
          errorMessage={errors.nombres}
          value={formData.nombres}
          onChange={(e) => handleChange("nombres", e.target.value)}
          onBlur={(e) => handleBlur("nombres", e.target.value)}
          isRequired
        />
        <Input
          type="text"
          label="Apellidos"
          variant="underlined"
          placeholder="Ingresa tus apellidos"
          className="w-1/2"
          isInvalid={!!errors.apellidos}
          errorMessage={errors.apellidos}
          value={formData.apellidos}
          onChange={(e) => handleChange("apellidos", e.target.value)}
          onBlur={(e) => handleBlur("apellidos", e.target.value)}
          isRequired
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <Select
          label="Tipo de Documento"
          variant="underlined"
          placeholder="Seleccione tipo de documento"
          className="w-1/2"
          selectedKey={formData.tipoDeDocumento}
          onSelectionChange={(value) => handleChange("tipoDeDocumento", value)}
          isRequired
        >
          <SelectItem key="CC">CC</SelectItem>
          <SelectItem key="TI">TI</SelectItem>
          <SelectItem key="CE">CE</SelectItem>
        </Select>
        <Input
          type="text"
          label="Número de Documento"
          variant="underlined"
          placeholder="Ingresa tu número de documento"
          className="w-1/2"
          isInvalid={!!errors.numeroDeDocumento}
          errorMessage={errors.numeroDeDocumento}
          value={formData.numeroDeDocumento}
          onChange={(e) => handleChange("numeroDeDocumento", e.target.value)}
          onBlur={(e) => handleBlur("numeroDeDocumento", e.target.value)}
          isRequired
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <Input
          type="text"
          label="Dirección"
          variant="underlined"
          placeholder="Ingresa tu dirección"
          className="w-1/2"
          value={formData.direccion}
          onChange={(e) => handleChange("direccion", e.target.value)}
          isRequired
        />
        <Input
          type="text"
          label="Barrio"
          variant="underlined"
          placeholder="Ingresa tu barrio"
          className="w-1/2"
          value={formData.barrio}
          onChange={(e) => handleChange("barrio", e.target.value)}
          isRequired
        />
      </div>

      <div className="flex mb-4 space-x-4">
        <Autocomplete
          label="Departamento"
          className="w-1/2"
          variant="underlined"
          allowsCustomValue={true}
          defaultItems={Departamentos.map((departamento) => ({
            key: departamento.nombre,
            label: departamento.nombre,
          }))}
        
          onSelectionChange={(value) => handleChange("departamento", value)}
          onInputChange={(value) => handleChange("departamento", value)}
          isRequired
        >
          {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
        </Autocomplete>
        <Input
          type="text"
          label="Ciudad"
          variant="underlined"
          placeholder="Ingresa tu ciudad"
          className="w-1/2"
          value={formData.ciudad}
          onChange={(e) => handleChange("ciudad", e.target.value)}
          isRequired
        />
      </div>

      <Checkbox
        color="default"
        className="mb-4"
        checked={formData.aceptaTerminos}
        onChange={(e) => handleChange("aceptaTerminos", e.target.checked)}
        isRequired
      >
        Aceptar Términos y Condiciones
      </Checkbox>

      <div className="flex justify-center">
        <CarritoComprasIcono formData={formData} />
      </div>
    </form>
  );
};
