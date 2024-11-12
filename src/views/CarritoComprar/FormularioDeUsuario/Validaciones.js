export const NumeroDocumento = (NumeroDocumento) => {
    const documentoString = NumeroDocumento.toString();
  
    if (/^[0-9]{5,15}$/.test(documentoString)) {
      return false; 
    } else {
      return "El número de documento no es válido, debe ser un número de 5 a 15 caracteres";
      ;
    }
  };
  
  export const validarNombre = (nombre) => {
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(nombre)  || nombre.length > 50) {
      return false; // Retorna vacío si cumple con la condición
    } else {
      return "El nombre debe contener solo letras máximo 50 caracteres";;
    }
  };


  export const validartelefono = (telefono ) => {
    if (  /^\d{10}$/.test(telefono.toString())) {
      return false; // Retorna false si cumple con la condición
    } else {
      return "El número de telefono debe comenzar con 3, tener 10 dígitos y solo contener números.";
    }
  };
  

  export const validarCorreo = (correo)=> {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (regexCorreo.test(correo)) {
      return false; // Retorna vacío si cumple con la condición
    } else {
      return "El correo electrónico no es válido.";
    }
  };

  export const validarApellidos = (nombre) => {
    if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/.test(nombre) || nombre.length > 50) {
      return false; // Retorna vacío si cumple con la condición
    } else {
      return "Debe ingresar los 2 apellidos; debe contener solo letras y máximo 50 caracteres";
    }
  };

