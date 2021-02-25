import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepositories } from "../repositories/SurveysRepositories";


class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveyRepositories = getCustomRepository(SurveysRepositories);
        const survey = surveyRepositories.create({
            title,
            description,
        });

        await surveyRepositories.save(survey);

        return response.status(201).json(survey);
    };

    async show(request: Request, response: Response) {
        const surveyRepositories = getCustomRepository(SurveysRepositories);

        const allSurvey = await surveyRepositories.find();
        return response.json(allSurvey);
    }
};

export { SurveysController };