function Boton(props) {
    return(
        <button
            className={`px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-50 ${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    )
}

export default Boton