export default function Boton(props: BotonProps) {
    return (
        <button
            type={props.type ? props.type : 'button'}
            className={props.btnClassName ? props.btnClassName : 'btn btn-primary'}
            onClick={props.onClick}
            disabled={props.disabled ? props.disabled : false}
        >
            {props.children}
        </button>
    )
}

interface BotonProps {
    children: React.ReactNode;
    onClick?(): void;
    type?: 'button' | 'submit' | 'reset';
    btnClassName?: string;
    disabled?: boolean;
}