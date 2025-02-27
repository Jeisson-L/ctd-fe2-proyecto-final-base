import { BotonSuscribir, CloseButton, CotenedorTexto, DescripcionModal, ImagenModal, TarjetaModal, TituloModal } from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from "./types";

interface IProps {
    setModal: (n: INoticiasNormalizadas | null) => void;
}

const TarjetaModalPremium = ({ setModal }: IProps) => {
    return (<TarjetaModal>
        <CloseButton onClick={() => setModal(null)}>
            <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
        <CotenedorTexto>
            <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
            <DescripcionModal>
                Suscríbete a nuestro newsletter y recibe noticias de
                nuestros personajes favoritos.
            </DescripcionModal>
            <BotonSuscribir
                onClick={() =>
                    setTimeout(() => {
                        alert("Suscripto!");
                        setModal(null);
                    }, 1000)
                }
            >
                Suscríbete
            </BotonSuscribir>
        </CotenedorTexto>
    </TarjetaModal>
    )
}

export default TarjetaModalPremium