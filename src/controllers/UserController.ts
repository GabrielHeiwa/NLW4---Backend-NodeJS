import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
        
        const usersRepository = getCustomRepository(UserRepositories);
        const userAlreadyExist = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExist) {
            return response.status(400).json({
                error: "User already exist"
            });
        };
        
        const user = usersRepository.create({
            name,
            email,
        });

        await usersRepository.save(user)

        return response.status(201).send(user);
    };
};

export { UserController };
