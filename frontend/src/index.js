const blogDiv = document.getElementById("blog");
sessionStorage.setItem("title", 0)
sessionStorage.setItem("body", 0)
sessionStorage.setItem("subbody", 0)
sessionStorage.setItem("image", 0)
axios.get("./blog")
  .then((res) => {
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);

      // Criando o card
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem";

      // Criando a imagem
      const img = document.createElement("img");
      img.src = data[i].image; // Colocando o link da imagem
      img.className = "card-img-top";
      img.alt = data[i].title;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.innerText = data[i].title;

      const text = document.createElement("p");
      text.className = "card-text";
      text.innerText = data[i].body;

      const author = document.createElement("p");
      author.className = "card-text";
      author.innerText = `Autor: ${data[i].author} - Data: ${data[i].date}`;

      // Criando o link
      const link = document.createElement("a");
      link.className = "btn btn-primary";
      link.innerText = "Saiba mais";
      link.onclick = () => {
        console.log(data[i])
        sessionStorage.setItem("subbody", data[i].subBody)
        sessionStorage.setItem("author", data[i].author)
        sessionStorage.setItem("title", data[i].title)
        sessionStorage.setItem("body", data[i].body)
        sessionStorage.setItem("image", data[i].image)

      }
      link.href = "./views/enter.html"

      cardBody.appendChild(title);
      cardBody.appendChild(text);
      cardBody.appendChild(author);
      cardBody.appendChild(link);

      // Adicionando a imagem e o corpo no card
      card.appendChild(img);
      card.appendChild(cardBody);

      // Adicionando o card no blogDiv
      blogDiv.appendChild(card);
    }
  })
  .catch((err) => {
    console.log(err);
  });
