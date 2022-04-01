import DogWalkingBusiness from "../src/Business/DogWalkingBusiness"
import { CustomError } from "../src/Error/CustomError"
import { DURACAO } from "../src/Model/Walk"
import DogWalkingDataMock from "./mocks/DogWalkingDataMock"

const dogWalkingBusinessMock = new DogWalkingBusiness(
  new DogWalkingDataMock()
)

describe('teste ao cadastrar passeio', () =>{

  test("erro ao passar algum input vazio", async () => {
    const input = ({
      data_de_agendamento: "22/04/1996",  
      duracao: DURACAO.MEIAHORA,
      latitude: 30.12313131,
      longitude: 23.313123131,
      pets:2,
      horario_inicio: "",
      horario_termino: "18:30:00"
    })

    try {
      await dogWalkingBusinessMock.create(input)

    } catch (error) {
      if (error instanceof CustomError) {
        console.log(error.message)
        expect(error.message).toEqual("Preencha todos os dados corretamente")
      }
    }
  })



})