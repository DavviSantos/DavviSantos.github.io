function carregarJSON(caminho, callback) {
  fetch(caminho)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o JSON");
      return response.json();
    })
    .then(data => callback(data))
    .catch(error => console.error("Erro:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  carregarJSON("./data/cursos.json", exibirUniversidades);
});

function exibirUniversidades(universidades) {
  if (!universidades || universidades.length === 0) {
    console.error("Nenhuma universidade encontrada no JSON.");
    return;
  }

  const container = document.getElementById("lista-universidades");
  container.classList.add("universidades-grid");

  universidades.forEach(universidade => {
    const uniDiv = document.createElement("div");
    uniDiv.classList.add("universidade");

    const nome = document.createElement("h3");
    nome.textContent = `${universidade.sigla_faculdade} - Campus ${universidade.campus}`;
    uniDiv.appendChild(nome);

    const ul = document.createElement("ul");
    universidade.cursos.forEach(curso => {
      const li = document.createElement("li");
      li.textContent = curso;
      ul.appendChild(li);
    });

    uniDiv.appendChild(ul);
    container.appendChild(uniDiv);
  });
}
