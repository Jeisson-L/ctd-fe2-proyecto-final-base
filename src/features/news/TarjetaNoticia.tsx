import { BotonLectura, DescripcionTarjetaNoticia, FechaTarjetaNoticia, ImagenTarjetaNoticia, TarjetaNoticia, TituloTarjetaNoticia } from "./styled"
import { INoticiasNormalizadas } from "./types";

interface IProps {
    noticia: INoticiasNormalizadas,
    onClickVerMas: (n: INoticiasNormalizadas) => void;
}

const TarjetaNoticias = ({ noticia, onClickVerMas }: IProps) => {
    return (<TarjetaNoticia>
        <ImagenTarjetaNoticia src={noticia.imagen} />
        <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
        <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
        <DescripcionTarjetaNoticia>
            {noticia.descripcionCorta}
        </DescripcionTarjetaNoticia>
        <BotonLectura onClick={() => onClickVerMas(noticia)}>Ver más</BotonLectura>
    </TarjetaNoticia>
    )
}

export default TarjetaNoticias;