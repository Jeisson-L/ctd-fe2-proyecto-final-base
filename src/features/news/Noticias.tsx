import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import {
  ContenedorNoticias, ListaNoticias, TituloNoticias,
} from "./styled";
import TarjetaNoticias from "./TarjetaNoticia";
import Modal from "./Modal";
import { normalizarNoticias } from "./Noticias.Utils";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const noticiasNormalizadas = normalizarNoticias(respuesta);
      setNoticias(noticiasNormalizadas);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticias noticia={n} onClickVerMas={setModal} />
        ))}
        {modal ? (
          <Modal esPremium={modal?.esPremium} modal={modal} setModal={setModal} ></Modal>
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;


//Se aplica SOLID con el principio de responsabilidad única al desagregar
//la funcionalidad en más componentes.