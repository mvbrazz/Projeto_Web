var chave;

function Verifica_Status(menu,menu2,menu3) {
    
    var display = document.getElementById(menu).style.display;
    let myItem = localStorage.getItem('Login');

    if(myItem == null && display != "none"){ 
       document.getElementById(menu).style.display = 'none';
       document.getElementById(menu2).style.display = 'flex';
    }
    else{
       document.getElementById(menu).style.display = 'none';
       document.getElementById(menu3).style.display = 'block';
    } 

}

function Login(conteudo_login,menu2,menu3,erro_login) {
   
    var nome = document.querySelector("#nome");
    var senha = document.querySelector("#senha");
    
    if(nome.value.length < 4 || senha.value.length < 4){
       alert("Você precisa digitar o login e a senha, ambos maiores que 4 caracteres. ");
    }
    else{
       axios.post('https://reqres.in/api/login',{
          email: nome.value,
          password: senha.value
       })
       .then(function (response) {
          console.log("Entrou" + response.data.token);
          localStorage.setItem('Login',`${response.data.token}`);
          logado(menu2,menu3);
       })
       .catch(function (error) {
          console.log(error);
          document.getElementById(erro_login).style.display = 'block';
       });
    }
}

function logado(menu2,menu3) {
   
    var display = document.getElementById(menu2).style.display;
    
    if(display != "none"){
       document.getElementById(menu2).style.display = 'none';
       document.getElementById(menu3).style.display = 'block';
    }
    
}

function heroisRetornados(){
   return axios.get('http://localhost:3000/BuscarTodosHerois');
}

function Pesquisa(menu3) {
   
   var cont =0;
   var radios;
   var contaRadio = 0;
   var vetHerois;
   var herois = [];

   let menuHerois = document.getElementById("Lista_herois");

   var aux = document.getElementsByName("geral");
   var lista = document.getElementById("Lista_herois");
      
   for (var i = 0; i < aux.length; i++) {
      if (aux[i].checked) {
         radios = aux[i].value;
         contaRadio++;
      }
   }
   if(contaRadio != 1){
      alert("Você precisa escolher um atributo!");
   } 
   else{  

      vetHerois = heroisRetornados();
     
      vetHerois.then(function(resposta){

         for(i = 0;i<resposta.data.length;i++){
         
            if(resposta.data[i].Atributo_Primario == radios){
            
               var heroi = {};
         
               heroi.nome = resposta.data[i].Nome;
               heroi.tipo_ataque = resposta.data[i].Tipo_Ataque;
               heroi.atributo_primario = resposta.data[i].Atributo_Primario;
               herois[cont] = heroi;
               cont++;
          
            }
  
         } 

         while(menuHerois.firstChild){
            menuHerois.removeChild(menuHerois.firstChild);
         }

         for(i=0;i<herois.length;i++){
     
            let help = document.createElement('div');
            help.style.textAlign = "center";
            help.style.fontWeight = "bold";
            help.style.fontSize = "smaller";
         
            if(herois[0].atributo_primario == "Agilidade"){
               help.style.backgroundColor = "green";
            }
            else if(herois[0].atributo_primario == "Inteligencia"){
               help.style.backgroundColor = "skyblue";
            }
            else{
               help.style.backgroundColor = "red";
            }
 
            var text1 = document.createTextNode(herois[i].nome);
            help.appendChild(text1);

            help.classList.add('dadosHerois');

            lista.appendChild(help);      

         }  

      })
   }    
 
}

function Menu4(menu3,menu4){
   var display = document.getElementById(menu3).style.display;
   document.getElementById(menu3).style.display = 'none';
   document.getElementById(menu4).style.display = 'flex';
}

function adicionandoHeroi(name,ata,atri){
   axios.post('http://localhost:3000/AdicionaHerois', {nome: name, ataque: ata, atributo: atri});
}

function Adiciona(menu4,menu3) {

   var nome = document.querySelector("#nomeHeroi");
   var display = document.getElementById(menu4).style.display;
   var display = document.getElementById(menu4).style.display;
   var radio = 0; 

   if(nome.value.length < 2){
      alert("Você precisa digitar o nome do Herói!");
   }
   else{

      var atri = document.getElementsByName("Atributos");
      var ata = document.getElementsByName("Ataque");
      

      for (var i = 0; i < atri.length; i++) {
         if (atri[i].checked) {
            atri = atri[i].value;
            radio++;
         }    
      }  
      
      for (var i = 0; i < ata.length; i++) {
         if (ata[i].checked) {
            ata = ata[i].value;
            radio++;
         }  
      }

      if(radio != 2){
         alert("Você precisa selecionar os atributos e o tipo de ataque!");
      }
      else{
         adicionandoHeroi(nome.value,ata,atri);
         document.getElementById(menu4).style.display = 'none';
         document.getElementById(menu3).style.display = 'block';
      }
   }
}