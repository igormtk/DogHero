export class CalculatePrice {
    public calculatePrice(pets: number, duration: string){
        if(pets === 1 && duration === "30"){
            const preco = 25
            return preco
        } else if (pets > 1 && duration === "30"){
            const preco =  25 + (pets-1) * 15
            return preco
        } else if(pets === 1 && duration === "60"){
            const preco = 35
            return preco
        } else if (pets > 1 && duration === "60"){
            const preco =  35 + (pets-1) * 20
            return preco
        }
    }
}