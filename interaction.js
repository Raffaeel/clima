const inputPesquisa = document.getElementById('pesquisa');
const buttonPesquisa = document.getElementById('pesquisarButton');



const tempElemento = document.getElementById('temperatura');
const saidaGrafica = document.getElementById('SaidaGrafica');
const saidaDias = document.getElementById('SaidaDias');

const ctxDia = document.getElementById('graficoDia').getContext('2d');
const ctxSemana = document.getElementById('graficoSemana').getContext('2d');

buttonPesquisa.addEventListener('click', async function () {
    const cidade = inputPesquisa.value.trim();
    if (cidade === "") {
        alert("Digite o nome da cidade!");
        return;
    }
    await buscarClima(cidade);
});

async function buscarClima(cidade) {
    const apikey = "e3c0867316351663dc1fd6054c03d2cf";
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}&units=metric&lang=pt_br`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        console.log(dados);

        if (dados.cod === 200) {
            // Atualiza apenas o conteúdo do elemento específico
            tempElemento.innerHTML = `Temperatura: ${dados.main.temp}°C<br>Clima: ${dados.weather[0].description}`;
                
            atualizarIconeClima(dados.weather[0]);
          
        } else {
            tempElemento.innerHTML = 'Cidade não encontrada!';
            console.error("Erro: Cidade não encontrada");
        }
    } catch (erro) {
        console.error('Erro ao buscar clima', erro);
        tempElemento.innerHTML = 'Erro ao buscar dados';
    }
}           


function atualizarIconeClima(clima) {
    const icones = {
        clear: "🌞",
        clouds: "☁️",
        rain: "🌧️",
        thunderstorm: "⛈️",
        snow: "❄️",
        drizzle: "🌦️",
        mist: "🌫️"
    };

    const climaFormatado = clima.main.toLowerCase(); 
    const icone = icones[climaFormatado];

    const divIcone = document.getElementById("iconClima");

    if (icone) {
        divIcone.textContent = icone;
    } else {
        divIcone.textContent = "Clima não reconhecido.";
    }
};











