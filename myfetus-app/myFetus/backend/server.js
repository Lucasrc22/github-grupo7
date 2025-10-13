const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');
const pregnantRoutes = require('./routes/pregnants');
const pregnancyRoutes = require('./routes/pregnancies');
const pregnancyEventsRoutes = require('./routes/pregnancyEvents');

//documentos
const documentsRoutes = require('./routes/documents');
const medicoesRoutes = require('./routes/medicoes'); 

app.use('/users', userRoutes);
app.use('/pregnants', pregnantRoutes);
app.use('/pregnancies', pregnancyRoutes);
app.use('/pregnancyEvents', pregnancyEventsRoutes);
app.use('/pregnantDocuments', documentsRoutes);
app.use('/medicoes', medicoesRoutes); 

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
