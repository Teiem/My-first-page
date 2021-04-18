const ulpai = document.getElementById("para-fazer");
const input = document.getElementById('aitem');
const pesquisar = document.getElementById('pesquisar');

let meusItems = [];

window.onload = () => {
    if (!localStorage.getItem("tudoLista")) return localStorage.setItem("tudoLista", JSON.stringify([]));

    meusItems = JSON.parse(localStorage.getItem("tudoLista"));
    meusItems.forEach(displayItems);
}



function atualizaRelogio() {
    const date = new Date();
    document.getElementById("data").textContent = new Intl.DateTimeFormat("en-GB").format(date);
    document.getElementById("hora").textContent = new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "numeric" }).format(date);

    setTimeout(atualizaRelogio, 1000);
};


function criarItem(conteudo) {
    if (!conteudo.length) return;

    const novoel = document.createElement("li");

    novoel.textContent = conteudo;
    novoel.addEventListener("click", removersi);
    novoel.classList.add("adicionando");
    ulpai.appendChild(novoel);

    meusItems.push(conteudo);
    localStorage.setItem("tudoLista", JSON.stringify(meusItems));
}

input.addEventListener("keydown", ({ key }) => {
    if (key !== "Enter") return;

    criarItem(input.value);
    input.value = "";
})


function removersi({ target }) {
    // TODO, bug if multiple have same text

    target.classList.remove("adicionando");
    target.classList.add("excluindo");
    meusItems = meusItems.filter(item => item !== target.textContent);
    localStorage.setItem("tudoLista", JSON.stringify(meusItems));

    setTimeout(() => target.remove(), 200);
}

pesquisar.addEventListener("keydown", ({ key }) => {
    if (key !== "Enter") return;

    const termos = pesquisar.value;
    window.open(`https://www.google.com/search?q=${termos}`);
    pesquisar.value = "";

})

function displayItems(conteudo) {
    const novoel = document.createElement("li");
    novoel.textContent = conteudo;
    novoel.addEventListener("click", removersi);
    ulpai.appendChild(novoel);
}



/* INIT */

atualizaRelogio();
document.querySelectorAll("li").forEach(item => item.addEventListener("click", removersi));