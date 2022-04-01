import { app } from "./Data/app";
import { dogWalkingRouter } from "./Routes/dogWalkerRouter";

app.use("/doghero", dogWalkingRouter);