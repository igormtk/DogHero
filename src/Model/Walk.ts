export enum DURACAO {
    MEIAHORA = "30",
    HORA = "60",
}

export enum STATUS {
    INICIANDO = "NÃO REALIZADO",
    ANDAMENTO = "EM ANDAMENTO",
    FINALIZADO = "FINALIZADO"
}

export type CreateWalkInputDTO = {
    data_de_agendamento: string, 
    duracao: DURACAO, 
    latitude: number, 
    longitude: number, 
    pets: number, 
    horario_inicio: string,
    horario_termino: string
}

export type StartWalkInputDTO = {
    id: string,
    horario_inicio: string
}

export type FinishWalkInputDTO = {
    id: string,
    horario_termino: string
}

export class Walk {

    constructor(
        private id: string,
        private status: STATUS,
        private data_de_agendamento: string,
        private preco: number,
        private duracao: string,
        private latitude: number,
        private longitude: number,
        private pets: number,
        private horario_inicio: string,
        private horario_termino: string
    ){
        this.id = id,
        this.status = status,
        this.data_de_agendamento = data_de_agendamento,
        this.preco = preco,
        this.duracao = duracao,
        this.latitude = latitude,
        this.longitude = longitude,
        this.pets = pets,
        this.horario_inicio = horario_inicio,
        this.horario_termino = horario_termino
    }
    public getId() {
        return this.id
    }

    public getStatus() {
        return this.status
    }

    public getDataDeAgendamento() {
        return this.data_de_agendamento
    }

    public getPreco() {
        return this.preco
    }

    public getDuracao() {
        return this.duracao
    }

    public getLatitude() {
        return this.latitude
    }

    public getLongitude() {
        return this.longitude
    }

    public getPets() {
        return this.pets
    }

    public getHorarioInicio() {
        return this.horario_inicio
    }

    public getHorarioTermino() {
        return this.horario_termino
    }

    static toWalkModel(data:any):Walk{
        return new Walk(
            data.id, 
            data.status,
            data.data_de_agendamento, 
            data.preco, data.duracao, 
            data.latitude, 
            data.longitude, 
            data.pets, 
            data.horario_inicio, 
            data.horario_termino)
    }
}