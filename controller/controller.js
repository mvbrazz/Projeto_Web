let http = require('http'),
path = require('path'),
express = require('express'),
app = express();
const cors = require('cors');

//RECONHECER OS PARÂMETROS PASSADOS NO POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");  //Escolhendo quem pode estar fazendo o uso da API
    app.use(cors());
    next();
});

app.set('view engine','hbs');
app.set('views',path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(cookieParser());

const {BuscarTodosHerois,AdicionaHerois} = require('../model/funcoes');
const { cookie } = require('express/lib/response');

app.get('/BuscarTodosHerois', (req, res) => {
    var aux = BuscarTodosHerois();
    
    aux.then(v => {
        res.send(v);
        console.log(v); 
    });

});

app.post('/AdicionaHerois', (req, res) => {
    
    var aux = BuscarTodosHerois();
    
    aux.then(v => {
        var cont;
        for(var i = 0;i< v.length;i++){
            if(req.body.nome != v[i].Nome){
                cont++;
            }

        }
        if(cont == v.length){       
            AdicionaHerois(req.body.nome,req.body.ataque,req.body.atributo);
            res.send('Heroi Adicionado com sucesso!');
        }
        else{
            console.log('aki');
            res.send(false);
            return false;
        }
    });

});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
})
