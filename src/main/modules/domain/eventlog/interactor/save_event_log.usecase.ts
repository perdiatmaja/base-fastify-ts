import { inject, injectable } from "tsyringe";
import RepositoryToken from "../../../../constants/repository.token";
import BaseInteractor from "../../base.interactor";
import LogRepository from "../repository/event_log.repository";

interface SaveEventLogUseCaseParam {
    activityType: string,
    status: number,
    userType: string,
    userId: string
}

@injectable()
class SaveEventLogUseCase extends BaseInteractor<string, SaveEventLogUseCaseParam> {
    private readonly logRepostitory: LogRepository

    constructor(@inject(RepositoryToken.LOG_REPOSITORY) logRepostitory: LogRepository) {
        super()
        this.logRepostitory = logRepostitory
    }

    protected buildPromise(param: SaveEventLogUseCaseParam): Promise<string> {
        return this.logRepostitory.saveEventLog({
            activityType: param.activityType,
            status: param.status,
            userType: param.userType,
            userId: param.userId
        }).then((eventLog) => eventLog.id!)
    }
}

export default SaveEventLogUseCase