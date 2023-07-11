import { INoticiasNormalizadas } from "./Noticias";
import { ContenedorModal } from "./styled";
import TarjetaModal from "./TarjetaModal";
import TarjetaModalPremium from "./TarjetaModalPremium";

interface IProps {
    esPremium: boolean | undefined,
    modal: INoticiasNormalizadas,
    setModal: (n: INoticiasNormalizadas | null) => void;
}

const Modal = ({ esPremium, modal, setModal }: IProps) => {

    return (
        <ContenedorModal>
            <>{esPremium ? <TarjetaModalPremium setModal={setModal} /> : <TarjetaModal modal={modal} setModal={setModal} />}</>
        </ContenedorModal>
    )
}
export default Modal;