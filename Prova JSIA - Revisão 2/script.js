let alunos = [];

function adicionarAluno() {
  const nome = document.getElementById("nome").value.trim();
  const turma = document.getElementById("turma").value.trim();
  const curso = document.getElementById("curso").value.trim();

  if (!nome || !turma || !curso) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoAluno = {
    id: Date.now(),
    nome,
    turma,
    curso,
    notas: []
  };

  alunos.push(novoAluno);
  limparCampos();
  exibirAlunos(alunos);
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("turma").value = "";
  document.getElementById("curso").value = "";
}

function exibirAlunos(lista) {
  const container = document.getElementById("listaAlunos");
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum aluno encontrado.</p>";
    return;
  }

  lista.forEach(aluno => {
    const div = document.createElement("div");
    div.className = "aluno";
    div.innerHTML = `
      <strong>${aluno.nome}</strong><br>
      Turma: ${aluno.turma} | Curso: ${aluno.curso}<br><br>
      <label>Notas:</label>
      ${aluno.notas.map((nota, i) => `
        <input type="number" class="nota-input" value="${nota}" onchange="editarNota(${aluno.id}, ${i}, this.value)">
      `).join("")}
      <br>
      <input type="number" class="nota-input" placeholder="Nova nota">
      <button onclick="adicionarNota(${aluno.id}, this.previousElementSibling.value)">Adicionar Nota</button>
      <br><br>
      <strong>Média:</strong> ${calcularMedia(aluno.notas)} -
      <strong>${situacao(aluno.notas)}</strong>
    `;
    container.appendChild(div);
  });
}

function calcularMedia(notas) {
  if (notas.length === 0) return "0.00";
  const soma = notas.reduce((acc, val) => acc + parseFloat(val), 0);
  return (soma / notas.length).toFixed(2);
}

function situacao(notas) {
  const media = parseFloat(calcularMedia(notas));
  return media >= 7 ? "Aprovado ✅" : "Reprovado ❌";
}

function adicionarNota(id, valor) {
  const aluno = alunos.find(a => a.id === id);
  const nota = parseFloat(valor);
  if (!isNaN(nota) && nota >= 0 && nota <= 10) {
    aluno.notas.push(nota);
    exibirAlunos(alunos);
  } else {
    alert("Digite uma nota válida entre 0 e 10.");
  }
}

function editarNota(idAluno, indexNota, novoValor) {
  const nota = parseFloat(novoValor);
  if (isNaN(nota) || nota < 0 || nota > 10) {
    alert("Nota inválida!");
    return;
  }
  const aluno = alunos.find(a => a.id === idAluno);
  aluno.notas[indexNota] = nota;
  exibirAlunos(alunos);
}

function filtrarAlunos() {
  const termo = document.getElementById("filtro").value.trim().toLowerCase();
  if (termo === "") {
    exibirAlunos(alunos);
    return;
  }

  const filtrados = alunos.filter(aluno =>
    aluno.turma.toLowerCase().includes(termo) ||
    aluno.curso.toLowerCase().includes(termo)
  );
  exibirAlunos(filtrados);
}
