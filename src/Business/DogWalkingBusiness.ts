import { CreateWalkInputDTO, DURACAO, FinishWalkInputDTO, StartWalkInputDTO, STATUS, Walk } from "../Model/Walk";
import { CalculatePrice } from "../Services/calculatePrice";
import { FormataHoras } from "../Services/formatHours";
import { IdGenerator } from "../Utilities/idGenerator";
import { dogWalkingRepository } from "./DogWalkingRepository";

export default class DogWalkingBusiness {
    private idGenerator: IdGenerator;
    private dogWalkingData: dogWalkingRepository
    private calculatePrice: CalculatePrice
    private formatHours: FormataHoras

    constructor(
        dogWalkingDataImplementation: dogWalkingRepository
    ){
        this.dogWalkingData = dogWalkingDataImplementation
        this.idGenerator = new IdGenerator()
        this.calculatePrice = new CalculatePrice()
        this.formatHours = new FormataHoras()
    }

    create = async(input: CreateWalkInputDTO) => {
        const {
            data_de_agendamento,  
            duracao,
            latitude,
            longitude,
            pets,
            horario_inicio,
            horario_termino
        } = input

        if(!data_de_agendamento || !duracao || !latitude || !longitude || !pets || !horario_inicio || !horario_termino){
            throw new Error("Insira todos os campos!")
        }

        if(duracao !== DURACAO.HORA && duracao !== DURACAO.MEIAHORA){
            throw new Error("Esse tempo de duração é inválido!")
        }

        if(horario_inicio === horario_termino){
            throw new Error("O horário de início não pode ser igual ao de término")
        }
        
        const horaInicio = this.formatHours.FormataStringHora(horario_inicio)
        const horaTermino = this.formatHours.FormataStringHora(horario_termino)

        if(horaInicio > horaTermino){
            throw new Error("O horário de início não pode ser maior que o horário de término")
        }

        

        if(horario_termino.length !== 8 || horario_inicio.length !== 8){
            throw new Error("Insira um horário válido")
        }

        const id:string = this.idGenerator.generate()
        const status = STATUS.INICIANDO
        const preco = this.calculatePrice.calculatePrice(pets, duracao)

        const walk = new Walk(
            id,
            status,
            data_de_agendamento,
            preco as number,
            duracao,
            latitude,
            longitude,
            pets,
            horario_inicio,
            horario_termino
        )

        await this.dogWalkingData.insert(walk)
    }

    startWalk =async (input:StartWalkInputDTO ) => {
        const {id, horario_inicio} = input
        
        if(!id || !horario_inicio){
            throw new Error("Insira todos os campos!")
        }

        if(horario_inicio.length !== 8){
            throw new Error("Insira um horário válido")
        }

        const walkId = await this.dogWalkingData.getWalkById(id)
        const status = walkId.status

        if(status !== STATUS.INICIANDO){
            throw new Error("Esse passeio já foi iniciado ou já foi finalizado")
        }

        if(!walkId){
            throw new Error("Esse passeio não existe!")
        }

        if(walkId){
            await this.dogWalkingData.start_walk(horario_inicio, id)
        }
    }

    finishWalk = async (input:FinishWalkInputDTO ) => {
        const {id, horario_termino} = input
        
        if(!id || !horario_termino){
            throw new Error("Insira todos os campos!")
        }

        if(horario_termino.length !== 8){
            throw new Error("Insira um horário válido")
        }

        const walkId = await this.dogWalkingData.getWalkById(id)
        const status = walkId.status
        const duracao = Number(walkId.duracao)
        const horarioInicio = walkId.horario_inicio

        const horarioInicioFormatado = this.formatHours.FormataStringHora(horarioInicio)
        const horarioTerminoFormatado = this.formatHours.FormataStringHora(horario_termino)
        console.log(horarioTerminoFormatado - horarioInicioFormatado)

        if(status !== STATUS.ANDAMENTO){
            throw new Error("Esse passeio ainda não foi iniciado!")
        }

        if(duracao === 30 && (horarioTerminoFormatado - horarioInicioFormatado) < (30*60) ){
            throw new Error("Esse passeio não teve a duração mínima!")
        }

        if(duracao === 60 && (horarioTerminoFormatado - horarioInicioFormatado) < (60*60) ){
            throw new Error("Esse passeio não teve a duração mínima!")
        }

        if(horarioTerminoFormatado < horarioInicioFormatado){
            throw new Error("Não há como finalizar a corrida antes do horário de início!")
        }

        if(!walkId){
            throw new Error("Esse passeio não existe!")
        }

        if(walkId){
            await this.dogWalkingData.finish_walk(horario_termino, id)
        }
    }

    show = async (input: string) => {
        const  walkId  = input
       
        if(!walkId){
            throw new Error("Insira todos os campos!")
        }

        const verifyWalkId = await this.dogWalkingData.getWalkById(walkId)

        if(!verifyWalkId){
            throw new Error("Esse passeio não existe!")
        }

        const status = verifyWalkId.status

        if(status !== STATUS.FINALIZADO){
            throw new Error("Esse passeio ainda não foi encerrado!")
        }

        const tempoInicio = verifyWalkId.horario_inicio
        const tempoTermino = verifyWalkId.horario_termino

        const tempoInicioFormatado = this.formatHours.FormataStringHora(tempoInicio)
        const tempoTerminoFormatado = this.formatHours.FormataStringHora(tempoTermino)

        const diferenca = this.formatHours.diferenca(tempoTerminoFormatado, tempoInicioFormatado)
        const diferencaFormatada = this.formatHours.segundosParaHora(diferenca)

        return diferencaFormatada

    }

    index = async(page: number|any, walksPerPage:number|any) => {
        const pageInput = page
        const walksPerPageInput = walksPerPage

        if(pageInput === 0){
            throw new Error("A página não pode ser igual a 0")
        }

        if((pageInput || pageInput === "") && !walksPerPageInput){
            throw new Error("Insira todos os campos")
        }

        if(!pageInput && (walksPerPageInput || walksPerPageInput === "")){
            throw new Error("Insira todos os campos")
        }

        if(pageInput && walksPerPageInput){
            const result = await this.dogWalkingData.getAllWalksPaged(pageInput, walksPerPageInput)
            return result
        } else {
            const result = await this.dogWalkingData.getAllWalks()
            return result
        }
    }
}