
var Calculadora = {

  display : document.getElementById('display'),
  buttons : document.getElementsByClassName('tecla'),
  result: 0,
  op : ["", "", ""],  //   id del operador, 1er numero, 2do numero
  account : 0,

  setDisplayText: function(text)
  {
    currentText = this.display.textContent;

    if(text == "On")
    {
      this.display.textContent = "0";
      return;
    }

    if(text == "punto")
    {
      if (currentText.includes(".")) {
        return;
      }
      text = ".";
    }

    if(text == "signo")
    {
      text = "0";
      if (currentText.includes("-"))
      {
        currentText = currentText.replace("-", "");
        text = "";
      }
      else
      {
        if (currentText != "0")
        {
          text = "-" + currentText;
          currentText = "";
        }
      }
    }

    if (currentText == "0")
    {
      currentText = text;
    }
    else {
      //condicion para resultado
      if (text.includes("r"))
      {
        text = text.replace("r", "");
        currentText = "";
      }
      text = currentText + text;
    }

    if (text.length > 8)
    {
      text = text.substring(0, 8);
    }

    this.display.textContent = text;
  },

  effect : function(button)
  {
    button.style.padding = "1px";
    setTimeout(function(){button.style.padding = "0px";}, 50);
  },

  btnNumber : function(button)
  {
    this.effect(button);
    if (this.account > 0 && (button.alt.length == 1 || button.alt == "punto"))
    {
      this.display.textContent = "";
      this.account = 0;
    }
    this.setDisplayText(button.alt);
  },

  btnOperator : function(button)
  {
    this.effect(button);

    var displayContent = this.display.textContent;

    if (button.alt == "igual")
    {
      if (this.account == 0)
      {
        this.op[2] = displayContent;
      }
      else
      {
        this.op[1] = displayContent;
      }

      console.log(this.op);

      switch (this.op[0])
      {
        case "mas":
          this.result = Number(this.op[1]) + Number(this.op[2]) ;
          break;
        case "menos":
          this.result = Number(this.op[1]) - Number(this.op[2]) ;
          break;
        case "por":
          this.result = Number(this.op[1]) * Number(this.op[2]) ;
          break;
        case "dividido":
          this.result = Number(this.op[1]) / Number(this.op[2]) ;
          break;
        default:
          break;
      }

      console.log("result: " + this.result)
      this.setDisplayText(this.result + "r");
      btnEqualsPressed = true;
      this.account++;
      return;
    }

    this.op[0] = button.alt; // se guarda el operador
    this.op[1] = this.display.textContent // se guarda el num actual
    this.display.textContent = "";
    this.account = 0;
  },

  init : function()
  {
    for (var i = 0; i < 19; i++)
    {
      if (i!=2)
      {
        if (i!=3 && i!=7 && i!=11 && i!=17 && i!=18)
        {
          Calculadora.buttons[i].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[i])}
        }
        else
        {
          Calculadora.buttons[i].onclick = function(){ Calculadora.btnOperator(Calculadora.buttons[i])}
        }
      }
    }
    Calculadora.buttons[2].onclick = function(){ Calculadora.effect(Calculadora.buttons[2])}

    // this.buttons[0].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[0])}
    // this.buttons[1].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[1])}
    // this.buttons[4].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[4])}
    // this.buttons[5].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[5])}
    // this.buttons[6].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[6])}
    // this.buttons[8].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[8])}
    // this.buttons[9].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[9])}
    // this.buttons[10].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[10])}
    // this.buttons[12].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[12])}
    // this.buttons[13].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[13])}
    // this.buttons[14].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[14])}
    // this.buttons[15].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[15])}
    // this.buttons[16].onclick = function(){ Calculadora.btnNumber(Calculadora.buttons[16])}
    //
    // this.buttons[3].onclick = function(){ Calculadora.btnOperator(Calculadora.buttons[3])}  // dividido
    // this.buttons[7].onclick = function(){ Calculadora.btnOperator(Calculadora.buttons[7])}  // por
    // this.buttons[11].onclick = function(){ Calculadora.btnOperator(Calculadora.buttons[11])} // resta
    // this.buttons[17].onclick = function(){ Calculadora.btnOperator(Calculadora.buttons[17])} // igual
    // this.buttons[18].onclick = function(){ Calculadora.btnOperator(Calculadora.buttons[18])} // mas
    //
    // this.buttons[2].onclick = function(){ Calculadora.effect(Calculadora.buttons[2])} // raiz

    console.log("INICIADO");
  }
}

Calculadora.init();
