import { Walk } from "../../Model/Walk";
import BaseDatabase from "../BaseDatabase";

export default class DogWalkingData extends BaseDatabase {
    protected TABLE_NAME = "Dog_Walking"

    insert = async(walk: Walk) => {
        try {
            await BaseDatabase
            .connection(this.TABLE_NAME)
            .insert(walk)

            return walk
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    start_walk = async (start_walk:string, id: string): Promise<undefined>  => {
        try {
            const result = await BaseDatabase.connection.raw(`
                UPDATE ${this.TABLE_NAME} SET horario_inicio = '${start_walk}', status = "EM ANDAMENTO" WHERE id = '${id}'
            `
            );
            
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    finish_walk = async (finish_walk:string, id: string): Promise<undefined> => {
        try {
            const result = await BaseDatabase.connection.raw(`
                UPDATE ${this.TABLE_NAME} SET horario_termino = '${finish_walk}', status = "FINALIZADO" WHERE id = '${id}'
            `
            );
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getWalkById = async (id: string): Promise<void|any> => {
        try {
            
            const queryResult = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where('id', id)
            
            return queryResult[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getAllWalks = async (): Promise<Walk[]> => {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${this.TABLE_NAME} ORDER BY status ASC
            `
            );
            
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    getAllWalksPaged = async (page: number, walksPerPage:number): Promise<Walk[]> => {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * FROM ${this.TABLE_NAME} ORDER BY status ASC LIMIT ${page-1}, ${walksPerPage}
            `
            );
            
            return result[0]
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message)
        }
    }
}