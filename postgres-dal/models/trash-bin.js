class TrashBin{
    constructor(params){
        this.id =undefined;
        this.type = undefined;
        this.color = undefined;
        this.geoLocation =  undefined;
        this.emptyingDate = undefined;

        for(let a in params){
            if(this.hasOwnProperty(a)){
                this[a] = params[a]
            }   
         }
    }
}

module.exports = TrashBin;