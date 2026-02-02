import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.scss";
import clsx from "clsx";
type ImageDropzoneProps = {
    value: File[];
    onChange: (files: File[]) => void;
};

const Dropzone: React.FC<ImageDropzoneProps> = ({ value, onChange }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: true,
        onDrop: (acceptedFiles) => {
            onChange([...value, ...acceptedFiles]);
        },
    });

    return (
      <div {...getRootProps()} className={clsx(styles.dropzone)}>
        <input {...getInputProps()} />
        <p>Перетащите изображения или кликните</p>

        {value.length > 0 && (
          <ul>
            {value.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default Dropzone;