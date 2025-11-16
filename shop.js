  const busca = document.getElementById("filtroBusca");
  const categoria = document.getElementById("filtroCategoria");
  const preco = document.getElementById("filtroPreco");
  const produtos = document.querySelectorAll(".produto");

  function filtrar() {
    const texto = busca.value.toLowerCase();
    const cat = categoria.value;
    const faixa = preco.value;

    produtos.forEach(produto => {
      const nome = produto.dataset.nome.toLowerCase();
      const catProd = produto.dataset.categoria;
      const precoProd = parseFloat(produto.dataset.preco);

      let mostrar = true;

      // Filtro de busca
      if (texto && !nome.includes(texto)) {
        mostrar = false;
      }

      // Filtro de categoria
      if (cat && catProd !== cat) {
        mostrar = false;
      }

      // Filtro de preço
      if (faixa) {
        const [min, max] = faixa.split("-").map(Number);
        if (precoProd < min || precoProd > max) {
          mostrar = false;
        }
      }

      produto.style.display = mostrar ? "flex" : "none";
    });
  }

  busca.addEventListener("input", filtrar);
  categoria.addEventListener("change", filtrar);
  preco.addEventListener("change", filtrar);

  