import { DURACAO, STATUS, Walk } from "../../src/Model/Walk";

export const walkMock = new Walk(
    "id_mockado",
    STATUS.ANDAMENTO,
    "22/04/2023",
    70,
    DURACAO.MEIAHORA,
    70.989890808,
    70.989890808,
    4,
    "15:00:00",
    "15:30:00"
)

export const walkMock2 = new Walk(
    "id_mockado2",
    STATUS.FINALIZADO,
    "22/04/2023",
    45,
    DURACAO.MEIAHORA,
    70.989890808,
    70.989890808,
    2,
    "16:00:00",
    "16:30:00"
)

export const walkMockArray = [
    walkMock,
    walkMock2
]