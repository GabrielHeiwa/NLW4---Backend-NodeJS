import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveyController";
import { SendMailController } from "./controllers/SendMailController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveysController();
const sendMailController = new SendMailController();

// Users routes.
router.post("/users", userController.create);

// Survey routes.
router.post("/surveys", surveyController.create);
router.get("/surveys", surveyController.show);

// Send mail routes.
router.post("/sendMail", sendMailController.execute);

export { router };