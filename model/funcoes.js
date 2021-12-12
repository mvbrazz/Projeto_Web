const MongoClient = require('mongodb').MongoClient;

async function BuscarTodosHerois(){
    
    const conn = await MongoClient.connect('mongodb://localhost:27017');
    const db = conn.db('BancoProjeto');
    console.log('Conexao estabelecida');

    //db.collection('Nomes').insertOne({Nome: 'Arthur',idade: 21});
    
    /*
    db.collection('Nomes').find().toArray((err, res) => {
        if(err)throw err;
        console.log(res);
        conn.close();
    });*/
    //Usando promisses.

    //const res = await db.collection('Nomes').find().toArray();
    //console.log(res);
    //conn.close();
    //return res;
    
    return await db.collection('Herois').find().toArray();
    conn.close();

    /*  se for para post 
    setTimeout(() =>{
        conn.close();
    },1000);*/
}

async function AdicionaHerois(nome,ataque,atributo){
    
    const conn = await MongoClient.connect('mongodb://localhost:27017');
    const db = conn.db('BancoProjeto');
    console.log('Conexao estabelecida');
    console.log(nome);
    console.log(ataque);
    console.log(atributo);

    await db.collection('Herois').insertOne({Nome: nome,Atributo_Primario: atributo,Tipo_Ataque: ataque});
    conn.close();
}


module.exports = {BuscarTodosHerois,AdicionaHerois};