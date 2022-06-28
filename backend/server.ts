import app from './src/app.js';

const PORT: number = Number(process.env.PORT) ?? 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`)
})