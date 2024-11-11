import { Link, } from "react-router-dom";
import instragram from "../../assets/instagram.png";
import facebook from "../../assets/facebook.png";
import tiktik from "../../assets/tik-tok.png";
import { Image } from "@nextui-org/react";

export const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6">
      <hr className="my-6 border-blueGray-300" />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">¡Mantengámonos en contacto!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Inspirada en el pasado, creada para el presente ⚡
            </h5>
            <div className="mt-6 lg:mb-0 mb-6 flex">
              <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <Image className="m-auto" src={instragram} width={30} />
              </button>

              <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <Image className="m-auto" src={facebook} width={30} />
              </button>

              <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <Image className="m-auto" src={tiktik} width={30} />
              </button>
            </div>

          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Enlaces útiles</span>
                <ul className="list-unstyled">
                  <Link
                    className="relative text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                    to="/sobrenosotros"
                  >
                    Sobre nosotros
                  </Link>



                  <Link
                    className="relative text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                    to="/sobrenosotros"
                  >
                    Productos
                  </Link>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Otros Recursos </span>
                <ul className="list-unstyled">
                  <li>


                    <Link
                      className="relative text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                      to="/sobrenosotros"
                    >
                      Contactanos
                    </Link>
                  </li>
                  <li>

                    <Link
                      className="relative text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all after:duration-300"
                      to="/sobrenosotros"
                    >
                      Terminos y Condiciones
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">{new Date().getFullYear()} </span>{" "}
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-blueGray-500 hover:text-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mitology
              </a>{" "}
              por{" "}
              <a
                href="https://github.com/angelluna03030"
                className="text-blueGray-500 hover:text-blueGray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                Angel Luna
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
