const express = require('express');
const app = express();

app.use(express.json());

let personList = [];

const port = 3000;

app.get('/visualizar', (req, res) => {
    res.send(personList);
});

app.get('/params/:id', (req, res) => {
    const { id } = req.params;
    res.send(id);
});

app.post('/cadastro', (req, res) => {
    const { name, age } = req.body;
    personList.push({ name, age });
    res.send(`Usuário cadastrado: nome do usuário ${name}`);
});

app.put('/update/:name', (req, res) => {
    const { name } = req.params;
    const { newName, newAge } = req.body;

    personList = personList.map(person => 
        person.name === name ? { name: newName || person.name, age: newAge || person.age } : person
    );

    res.send(`Usuário ${name} atualizado (se existia).`);
});

app.delete('/delete/:name', (req, res) => {
    const { name } = req.params;

    const initialLength = personList.length;
    personList = personList.filter(person => person.name !== name);

    res.send(`Usuário ${name} removido (se existia).`);
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
