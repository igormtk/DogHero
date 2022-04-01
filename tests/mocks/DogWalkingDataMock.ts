import { Walk } from "../../src/Model/Walk"
import { DogWalkingRepositoryMock } from "./DogWalkingRepositoryMock"
import { walkMock, walkMockArray } from "./WalkMock"

export default class DogWalkingDataMock implements DogWalkingRepositoryMock{
    protected TABLE_NAME = "Dog_Walking"

    insert = async(walk: Walk): Promise<Walk> => {
        return walk
    }
    
    start_walk = async (start_walk: string, id: string):Promise<undefined>  => {
        return undefined
    }

    finish_walk = async(finish_walk: string, id: string): Promise<undefined> => {
        return undefined
    }

    getWalkById = async (id: string): Promise<void|any> => {
        if(id === "id_mockado"){
            return walkMock
        } else {
            undefined
        }
    }

    getAllWalks = async (): Promise<Walk[]> => {
        return walkMockArray
    }

    getAllWalksPaged = async (page: number, walksPerPage:number):Promise<Walk[]> => {
        return walkMockArray
    }

}