const express = require('express');
const app = express();

// Configura o EJS como motor de templates
app.set('view engine', 'ejs');

// Função para gerar uma cor de fundo aleatória em formato RGB
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

// Função para determinar a cor do texto com base no contraste
const getContrastColor = (bgColor) => {
  const rgb = bgColor.match(/\d+/g).map(Number);
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return luminance > 0.5 ? 'black' : 'white';
};

// Rota principal
app.get('/', (req, res) => {
  const bgColor = getRandomColor();
  const textColor = getContrastColor(bgColor);
  res.render('index', { bgColor, textColor });
});

// Inicia o servidor na porta 3000 (ou uma porta definida pelo ambiente)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});