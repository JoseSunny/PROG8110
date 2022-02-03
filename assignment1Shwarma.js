const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    ITEM: Symbol("item"),
    DESSERT: Symbol("dessert")
});

let total=0;
let foodtype,fooditem=0;



module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "";
        this.sDessert ="";

    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM;
                aReturn.push("Welcome to Jose Restaurant.");
                aReturn.push("What would you like to have ? \n Shawarma \n Burger \n Pizza");                
                break;
            case OrderState.ITEM:
                this.stateCur = OrderState.SIZE;
                this.sItem =sInput;
                fooditem=sInput.toLowerCase();
                aReturn.push("What size would you like ?(large or small)");
                break;

            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                foodtype=sInput.toLowerCase();
                if(fooditem =="burger" && foodtype=="large")
                {
                    total=total+10
                } 
                else if(fooditem =="burger" && foodtype=="small")
                {
                    total=total+4;
                }
                else if(fooditem =="Shawarma" && foodtype=="large")
                {
                    total=total+10;
                }
                else if(fooditem =="Shawarma" && foodtype=="small")
                {
                    total=total+4;
                }
                else if(fooditem =="pizaa" && foodtype=="large")
                {
                    total=total+10;
                }
                else if(fooditem =="pizaa" && foodtype=="small")
                {
                    total=total+4;
                }
                
                aReturn.push("What toppings would you like? Cheese or Sauce");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DESSERT
                this.sToppings = sInput;
                if(sInput.toLowerCase()=="cheese")
                {
                    total=total+3;
                } else if(sInput.toLowerCase()=="sauce")
                {
                    total=total+2;
                }
                aReturn.push("Would you like to add Dessert ? Icecream or Pudding" );
                break;

            case OrderState.DESSERT:
                this.stateCur = OrderState.DRINKS
                if(sInput.toLowerCase() != "no"){
                    this.sDessert ="Dessert:"+ sInput;
                    total =total+4;
                }                             
                aReturn.push("Would you like drinks with that?");
                break;

            case OrderState.DRINKS:                
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks ="Drinks:"+ sInput;
                    total =total+3; 
                }                
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                if(this.sDessert){
                    aReturn.push(this.sDessert);
                }
                aReturn.push("Estimated Amount  ="+total +" CAD");
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}
