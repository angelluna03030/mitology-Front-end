import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
export const Descripcion = ({ descripcion, imagen, titulo }) => {
  return (
    <div className="flex flex-col md:flex-row m-auto p-4 sm:mx-28 mb-6">
      <Image
        src={imagen}
        className="w-full  h-full rounded-lg md:rounded-none md:rounded-l-lg"
      />
      <div className="flex flex-col justify-center p-4 md:w-2/3 sm:m-14">
        <p className="font-semibold text-2xl md:text-5xl text-black">{titulo}</p>
        <p className="mt-4 text-left text-xl leading-relaxed text-[#868686] h-52 w-auto ">
          &bull; {descripcion}
        </p>
        <ScrollLink
          
          to="principio"
          smooth={true}
          duration={500}
          className="h-12 w-28 my-5 sm:my-0 flex items-center justify-center rounded-lg bg-[#b1b1b1] text-center border border-[#868686] hover:border-2 hover:border-[#676767] hover:shadow-lg cursor-pointer"
        >
          VER MÁS
        </ScrollLink>
      </div>
    </div>
  );
};
