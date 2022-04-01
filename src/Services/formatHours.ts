export class FormataHoras {
    public FormataStringHora(hora:string) {
        var h  = hora.split(":")[0];
        var m  = hora.split(":")[1];
        var s  = hora.split(":")[2];

        const hr = Number(h)
        const min = Number(m)
        const seg = Number(s)

        const formatada = (hr*3600)+(min*60)+(seg);

        return formatada
    }

    public segundosParaHora(seg: number) {
        var hora = Math.floor((seg/3600))
        var horaString = hora.toString()

        var minuto = Math.floor((seg%3600/60))
        var minutoString = minuto.toString()
        
        var segundo = ((seg%3600)%60)
        var segundoString = segundo.toString()

        function duasCasas(numero: string){
            if (Number(numero) <= 9){
                var numero = "0"+numero
            }
            if(Number(numero) === 0){
                var numero = "00"
            }
            return numero;
        }
        
        var horas = duasCasas(horaString) + ":" + duasCasas(minutoString) + ":" + duasCasas(segundoString) 
        return horas;
    }

    public diferenca(h1:number,h2:number) {
        return h1-h2
    }

    public data_format(s:number) {
        const h = Math.floor(s/3600);
        const min = Math.floor((s - (h*3600))/60);
        s = s - (Math.floor(s/60)*60);
        return h + "h "+ min + "min "+s + "s";
    }
}