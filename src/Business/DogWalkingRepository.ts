import { Walk } from "../Model/Walk";

export interface dogWalkingRepository {
    insert(walk: Walk):Promise<Walk>
    start_walk(start_walk: string, id: string): Promise<undefined>
    finish_walk(finish_walk: string, id: string): Promise<undefined>
    getWalkById(id:string):Promise<void | any>
    getAllWalks(): Promise<Walk[]>
    getAllWalksPaged(page: number, walksPerPage:number):Promise<Walk[]>
}