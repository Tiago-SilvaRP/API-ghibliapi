const btnBuscarFilme = document.getElementById("btn");

btnBuscarFilme.addEventListener("click", () => {
    BuscarFilme();
});

async function BuscarFilme() {
    const baseUrl = "https://ghibliapi.vercel.app";

    btnBuscarFilme.disabled = true;
    btnBuscarFilme.textContent = "Carregando...";

    try {
        const response = await fetch(`${baseUrl}/films`);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        };

        const data = await response.json();
        
        const filmesSorteado = data.sort(() => 0.5 - Math.random());
        const filmesAleatorios = filmesSorteado.slice(0, 10);

        const ulFilmes = document.getElementById("filmes");
        ulFilmes.innerHTML = filmesAleatorios.map(filme => 
            `
                <li class="card">
                    <h3 class="title">${filme.title}</h3>
                    <img class="img" src="${filme.movie_banner}" alt="${filme.title}">
                    <div class="informations">
                        <p class="description">${filme.description}</p>
                        <p class="duraction">Duraction: ${filme.running_time} minutes</p>
                    </div>
                </li>
            `
            )
            .join("");
        return filmesAleatorios;
    } catch (error) {
        console.error("Houve um erro ao buscar os filmes:", error);
    } finally {
        btnBuscarFilme.disabled = false;
        btnBuscarFilme.textContent = "Buscar Filme";
    };
};