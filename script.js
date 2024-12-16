document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  const tabelaCorpo = document.querySelector("table tbody");

  // Função para adicionar uma linha à tabela
  function adicionarAlunoTabela(aluno) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.creche}</td>
      <td>${aluno.idade}</td>
      <td>${aluno.frequencia === "1" ? "1 vez/semana" : "2 vezes/semana"}</td>
      <td>R$ ${calcularValor(aluno.frequencia)}</td>
      <td>${aluno.pagamento}</td>
      <td>
        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>
      </td>
    `;

    // Adiciona eventos nos botões de editar e excluir
    tr.querySelector(".excluir").addEventListener("click", () => {
      tr.remove();
      atualizarResumo();
    });

    tabelaCorpo.appendChild(tr);
    atualizarResumo();
  }

  // Função para calcular o valor com base na frequência
  function calcularValor(frequencia) {
    return frequencia === "1" ? 130 : 215; // Exemplo: R$130 para 1 vez, R$215 para 2 vezes
  }

  // Atualizar resumo total arrecadado
  function atualizarResumo() {
    const linhas = tabelaCorpo.querySelectorAll("tr");
    let total = 0;

    linhas.forEach((linha) => {
      const valor = linha.cells[4].innerText.replace("R$ ", "");
      total += parseFloat(valor);
    });

    document.getElementById("totalArrecadado").innerText = `R$ ${total.toFixed(
      2
    )}`;
  }

  // Manipular envio do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Coletar dados do formulário
    const aluno = {
      nome: form.nome.value,
      creche: form.creche.value,
      idade: form.idade.value,
      frequencia: form.frequencia.value,
      pagamento: form.pagamento.value,
    };

    // Adicionar aluno na tabela
    adicionarAlunoTabela(aluno);

    // Resetar o formulário
    form.reset();
  });
});
