import { useState, type ChangeEvent } from 'react';
import styles from './SeleccionarImagen.module.css';

export default function SeleccionarImagen(props: SeleccionarImagenProps) {

    const [imagenBase64, setImagenBase64] = useState<string>('');
    const [imagenURL, setImagenURL] = useState<string>(props.imagenURL ? props.imagenURL : '');

    const manejarOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Verifica si el usuario ha seleccionado archivos en el input de tipo file
        if (event.currentTarget.files) {
            // Obtiene el primer archivo seleccionado (ya que accept limita a imágenes)
            const archivo = event.currentTarget.files[0];

            // Convierte el archivo a base64 usando la función aBase64 y actualiza el estado local
            // Esto permite mostrar una vista previa de la imagen seleccionada
            aBase64(archivo)
                .then(valor => setImagenBase64(valor))  // Si la conversión es exitosa, guarda el base64 en el estado
                .catch(error => console.error(error));  // Maneja errores en la conversión

            // Llama a la función pasada por props para notificar al componente padre sobre el archivo seleccionado
            // Esto permite que el padre maneje el archivo
            props.imagenSeleccionada(archivo);

            // Limpia la URL de imagen existente para evitar mostrar ambas (base64 y URL) al mismo tiempo
            setImagenURL('');
        }
    };

    const aBase64 = (archivo: File) => {
        // Función auxiliar que convierte un archivo (File) a una cadena base64
        // Esto es útil para mostrar vistas previas de imágenes sin subirlas al servidor aún
        return new Promise<string>((resolve, reject) => {
            // Crea un FileReader para leer el contenido del archivo
            const reader = new FileReader();

            // Inicia la lectura del archivo como una URL de datos (data URL), que incluye el base64
            reader.readAsDataURL(archivo);

            // Configura el evento onload: cuando la lectura termine exitosamente, resuelve la promesa con el resultado
            reader.onload = () => resolve(reader.result as string);

            // Configura el evento onerror: si hay un error en la lectura, rechaza la promesa
            reader.onerror = (error) => reject(error);
        })
    }

    return (
        <>
            <label className="form-label">{props.label}</label>
            <input className="form-control" type="file" accept=".jpg,.jpeg,.png" onChange={manejarOnChange} />
            {imagenBase64 ?
                <div className={styles.div}>
                    <img src={imagenBase64} className="img-thumbnail" alt="Imagen seleccionada" />
                </div>
            : undefined}
            {imagenURL ?
                <div className={styles.div}>
                    <img src={imagenURL} className="img-thumbnail" alt="Imagen del actor" />
                </div>
            : undefined}
        </>

    )
}

interface SeleccionarImagenProps {
    label: string;
    imagenURL?: string;
    imagenSeleccionada: (file: File) => void;
}