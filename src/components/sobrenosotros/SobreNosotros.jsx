import { Image } from "@nextui-org/react";
import { Footer } from "../Footer";
import { Layout } from "../Layout";
import Logo from "../../assets/image.png";

export const SobreNosotros = () => {
  return (
    <>
      <Layout />
      <div className="px-4 md:px-10 lg:px-20 text-center">
        <p className="m-4 md:m-8 lg:m-10 text-2xl md:text-4xl lg:text-5xl font-semibold">
          Sobre Nosotros
        </p>
        <div className="flex justify-center">
          <Image
            src={Logo}
            alt="Logo de la marca"
            className="object-contain w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 "
          />
        </div>
        <p className="m-4 md:m-8 lg:m-10 text-lg md:text-xl font-semibold text-center">
          Somos una marca de ropa fundada en la ciudad de Medellín, nacimos de la necesidad propia de crear un concepto
          de moda que mezclara lo moderno y vanguardista con el pasado, con lo cual queremos evocar la importancia de la
          existencia humana para cambiar el mundo.
        </p>
      </div>
      <Footer />
    </>
  );
};
