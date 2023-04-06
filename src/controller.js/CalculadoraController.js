class CalculadoraController{
    constructor(){
        console.log("controller calculadora ok")
        this.elementsPrototype();
        this.loadElements(); 
        this.initEvents();    
    }

    loadElements(){
        this.el = {};
        document.querySelectorAll('[id]').forEach(element=>{
            this.el[Format.getCamelcase(element.id)] = element;
        })
    }
    elementsPrototype(){
        Element.prototype.hide = function() {
            this.style.display = "nome";
        }

        Element.prototype.show = function() {
            this.style.display = "block";
        }

        Element.prototype.toggle = function(){
            this.style.display = (this.style.display === "none") ? 'block' : "none" ;
            
        }

        Element.prototype.on = function(events, fn){
            events.split(' ').forEach(event => {
                this.addEventListener(event,fn);
            });
            return this;
        }

        Element.prototype.css = function(styles){
            for(let name in styles){
                this.style[name] = styles[name]
            };
            return this;
        }

        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;
        }

        Element.prototype.toggleClass = function(name){
            this.classList.toggle(name);
            return this;
        }

        Element.prototype.hasClass = function(name){
            return this.classList.contains(name);
        }

        HTMLFormElement.prototype.getForm = function(){
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function(){
            let json = {};
            this.getForm().forEach((value,key)=>{
                json[key]=value;
            })
            return json;
        }

    }//Close elementsPrototypes

    initEvents(){
        this.el.btnCalcularPisos.on('click',e=>{
            let largcomodo = this.el.larguraComodo.value;
            let compricomodo = this.el.comprimentoComodo.value;

            let largpiso = this.el.larguraPiso.value;
            let compripiso = this.el.comprimentoPiso.value;
            console.log("PEISO EM CM: "+ largpiso/100+" x "+compripiso/100)
            
            let metragemComodo = largcomodo*compricomodo;
            let metragemPiso = largpiso/100*compripiso/100;
            console.log("Metros quadrados comodo: "+metragemComodo+" "+"Metros quadrados piso: "+metragemPiso)

            let quantidadePiso =  Math.round(metragemComodo/metragemPiso);
            let quantidadePisoerro = Math.round((metragemComodo/metragemPiso)*0.20+quantidadePiso   );
            console.log(quantidadePiso,quantidadePisoerro)

            this.el.quantidadePiso.value = quantidadePiso;

            this.el.quantidadePisoErro.value = quantidadePisoerro;
            
        })
    }
}