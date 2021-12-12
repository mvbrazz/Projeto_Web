
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
   return axios.get(`https://api.opendota.com/api/heroes`);
}

function Pesquisa(menu3) {
   
   var cont =0;
   var radios;
   var vetHerois;
   var herois = [];

   let menuHerois = document.getElementById("Lista_herois");

   var aux = document.getElementsByName("geral");
   var lista = document.getElementById("Lista_herois");

   console.log(aux.value);
   if(aux.value==null){
      
   }
   else{}
      
      for (var i = 0; i < aux.length; i++) {
         if (aux[i].checked) {
            radios = aux[i].value;
         }
      }

      vetHerois = heroisRetornados();

      vetHerois.then(function(resposta){
        
      for(i = 0;i<resposta.data.length;i++){
         
         if(resposta.data[i].primary_attr == radios){

         var heroi = {};
         
         heroi.nome = resposta.data[i].localized_name;
         heroi.tipo_ataque = resposta.data[i].attack_type;
         heroi.atributo_primario = resposta.data[i].primary_attr;

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
      
      if(herois[0].atributo_primario == "agi"){
         help.style.backgroundColor = "green";
      }
      else if(herois[0].atributo_primario == "int"){
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
