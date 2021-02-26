import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from "../models/SurveysUsers";

@EntityRepository(SurveysUsers)
class SurveysUsersRepositories extends Repository<SurveysUsers> {

};

export { SurveysUsersRepositories };