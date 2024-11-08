const API_KEY = import.meta.env.VITE_API_KEY;
/**
 * Metodo para enviar datos por una petición HTTP [POST]
 * @param { string } url Recibe la ruta completa para enviar los datos
 * @param { object } data Recibe los datos para registrar la categoría
 * @return { object } Resupuesta de la petición
 */
export const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  // Devolver tanto el código de estado como los datos de respuesta
  return { status: response.status, dataResponse: responseData };
};

/**
 * Metodo para obtener datos por una petición HTTP [GET]
 * @param { string } url Recibe la ruta completa para enviar los datos
 * @return { Array } Respuesta de la petición
 */
export const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  const responseData = await response.json();
  // Devolver tanto el código de estado como los datos de respuesta
  return { status: response.status, dataResponse: responseData };
};

/**
 * Metodo para enviar datos por una petición HTTP [PUT]
 * @param { string } url Recibe la ruta completa para enviar los datos
 * @param { object } data Recibe los datos para modificar
 * @return { object } Resupuesta de la petición
 */
export const putData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return { status: response.status, dataResponse: responseData };
  } catch (error) {
    console.error('Error en la solicitud PUT:', error);
    throw error;
  }
};
/**
 * Método para enviar datos por una petición HTTP [POST]
 * @param { string } url Recibe la ruta completa para enviar los datos
 * @param { FormData } formData Recibe los datos para enviar en formato FormData
 * @return { object } Respuesta de la petición
 */
export const postFormData = async (url = '', formData) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: formData,
  });

  const responseData = await response.json();
  // Devolver tanto el código de estado como los datos de respuesta
  return { status: response.status, dataResponse: responseData };
};

/**
 * Método para enviar datos por una petición HTTP [PUT]
 * @param { string } url Recibe la ruta completa para enviar los datos
 * @param { FormData } formData Recibe los datos para enviar en formato FormData
 * @return { object } Respuesta de la petición
 */
export const putFormData = async (url = '', formData) => {
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: formData,
  });

  const responseData = await response.json();
  // Devolver tanto el código de estado como los datos de respuesta
  return { status: response.status, dataResponse: responseData };
};
