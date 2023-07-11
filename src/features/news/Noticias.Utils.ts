import { INoticias } from "./fakeRest";

export const normalizarNoticias = (noticias: INoticias[]) => {
    return noticias.map((n) => {
        return {
            id: n.id,
            titulo: `${normalizarPalabras(n.titulo)}`,
            descripcion: n.descripcion,
            fecha: `Hace ${calcularMinutos(n.fecha)} minutos`,
            esPremium: n.esPremium,
            imagen: n.imagen,
            descripcionCorta: n.descripcion.substring(0, 100),
        };
    });
}

export const normalizarPalabras = (title: string) => {
    const palabraNormalizada = title
        .split(" ")
        .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        })
        .join(" ");

    return palabraNormalizada;
};

export const calcularMinutos = (date: Date) => {
    const today = new Date();
    const minutosTranscurridos = Math.floor(
        (today.getTime() - date.getTime()) / 60000
    );
    return minutosTranscurridos;
};