export default function Menu() {
    return (
        <div className="menu" onClick={() => {
            const barraLateral = document.querySelector(".barra-lateral");
            const menu = document.querySelector(".menu");
            barraLateral?.classList.toggle("max-barra-lateral");

            if (barraLateral?.classList.contains("max-barra-lateral")) {
                menu?.children[0].classList.add("d-none");  // Oculta bi-list
                menu?.children[1].classList.remove("d-none");  // Muestra bi-x
            } else {
                menu?.children[0].classList.remove("d-none");  // Muestra bi-list
                menu?.children[1].classList.add("d-none");  // Oculta bi-x
            }
        }}>
            <i className="bi bi-list"></i>
            <i className="bi bi-x d-none"></i>
        </div>
    )
}