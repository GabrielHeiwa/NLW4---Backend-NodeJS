import { Request, Response } from "express";
import { resolve } from "path";
import { getCustomRepository } from "typeorm";
import { SurveysRepositories } from "../repositories/SurveysRepositories";
import { SurveysUsersRepositories } from "../repositories/SurveysUsersRepositories";
import { UserRepositories } from "../repositories/UsersRepositories";
import SendMailService from "../services/SendMailService";

class SendMailController {

    async execute(request: Request, response: Response) {

        const { email, survey_id } = request.body;

        const userRpositories = getCustomRepository(UserRepositories);
        const surveysRepositories = getCustomRepository(SurveysRepositories);
        const surveysUsersRepositories = getCustomRepository(SurveysUsersRepositories);

        const user = await userRpositories.findOne({ email });
        if (!user) {
            return response.status(400).json({
                msg: "User does not exist.",
            });
        };

        const survey = await surveysRepositories.findOne({ id: survey_id });
        if (!survey) {
            return response.status(400).json({
                msg: "Survey does not exist.",
            });
        };

        const surveyUsersAlreadyExist = await surveysUsersRepositories.findOne({
            where: [{ user_id: user.id }, { value: null }],
            relations: ["user", "survey"],
        });

        const npsPath = resolve(__dirname, "..", "views", "emails", "npmMail.hbs")
        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.NPS_EMAIL_URL_ANSWERS
        };

        if (surveyUsersAlreadyExist) {
            await SendMailService.execute(email, survey.title, survey.description, npsPath, variables);
            return response.status(200).json(surveyUsersAlreadyExist);
        }

        const surveysUsers = surveysUsersRepositories.create({
            user_id: user.id,
            survey_id,
        });
        await surveysUsersRepositories.save(surveysUsers);



        await SendMailService.execute(email, survey.title, survey.description, npsPath, variables);

        return response.status(201).json(surveysUsers);

    };
};

export { SendMailController };

