let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 :currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function addeventOnclik(){
  let dias = document.getElementsByClassName("my-class");
  for(let i in dias){
    if (dias.hasOwnProperty(i)) {
        dias[i].onclick = function(evt) {
            let dia = evt.target.innerHTML;
            verificaDiasDisponivel(this,dia);
            evt.stopPropagation();
        }
    }
  }
}

//verifica se o dia esta disponivel
async function verificaDiasDisponivel(item,dia){
  let anomes = document.getElementById("anomes").value;
  let day = trataDia(dia,'dia')+anomes;

  /*remove todas que tivereems com call bg-sucess */
  let dias = document.getElementsByClassName("my-class");
  for(let i in dias){
      if (dias.hasOwnProperty(i)) {
        let clas = Object.values(dias[i].classList);
        if(clas.includes('bg-success')){
          dias[i].classList.remove('bg-success');
        }
     }
  };
  /* --------------------------------------------- */

  item.classList.add("bg-success"); //adiciona a classe bg-success no dia selecionado


}


function trataDia(num,tipo) {
    let res = num;
    console.log(num,tipo);
    if(num <= 9 && tipo === 'mes'){
       res = (num+1) < 10 ? '0'+(num+1) : (num+1);
    }else if (num <= 9 && tipo === 'dia'){
       res = '0'+num;
    }
    return res
}

function showCalendar(month, year) {

  let firstDay = (new Date(year, month)).getDay(); //quantida de semanas
  let daysInMonth = 32 - new Date(year, month, 32).getDate(); //quantidade de dias no mes

  let tbl = document.getElementById("calendar-body");  // calendario vazio

  tbl.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  document.getElementById("anomes").value = '/'+ trataDia(month,'mes') +'/'+year;

  let date = 1;
  for (let i = 0; i < 6; i++) {

    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) { //criando a semnas

      if (i === 0 && j < firstDay) {
          let cell = document.createElement("td");

          row.appendChild(cell);
      } else if (date > daysInMonth) { //dias não pode ser maior que a quantidade de dias no mes
          break;
      } else {
        let cell = document.createElement("td"); //criando a celula
        let cellText = document.createTextNode(date); //criando o texto da celula

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) { //verificando se é o dia de hoje
          cell.classList.add("bg-info");
        }

        cell.appendChild(cellText); //adicionando o texto na celula
        cell.classList.add("my-class");
        row.appendChild(cell); //adicionando a celula na linha
        date++;
      }
    }

    tbl.appendChild(row);
  }

  addeventOnclik();
}
