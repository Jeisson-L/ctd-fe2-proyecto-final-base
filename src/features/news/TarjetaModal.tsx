import { CloseButton, ContenedorModal, CotenedorTexto, DescripcionModal, ImagenModal, TarjetaModal as TarjetaModaleStayle, TituloModal } from "./styled";
import { CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from "./types";

interface IProps {
    modal: INoticiasNormalizadas,
    setModal: (n: INoticiasNormalizadas | null) => void;
}

const TarjetaModal = ({ modal, setModal }: IProps) => {
    return (<ContenedorModal>
        <TarjetaModaleStayle>
            <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
            </CloseButton>
            <ImagenModal src={modal.imagen} alt="news-image" />
            <CotenedorTexto>
                <TituloModal>{modal.titulo}</TituloModal>
                <DescripcionModal>{modal.descripcion}</DescripcionModal>
            </CotenedorTexto>
        </TarjetaModaleStayle>
    </ContenedorModal>
    )
}

export default TarjetaModal