import express from "express";
import DogWalkingController from "../Controller/DogWalkingController";


export const dogWalkingRouter = express.Router();

const dogWalkingController = new DogWalkingController();

dogWalkingRouter.post("/create", dogWalkingController.create);
dogWalkingRouter.post("/start", dogWalkingController.start)
dogWalkingRouter.post("/finish", dogWalkingController.finish)
dogWalkingRouter.get("/show", dogWalkingController.show)
dogWalkingRouter.get("/walks", dogWalkingController.getWalks)