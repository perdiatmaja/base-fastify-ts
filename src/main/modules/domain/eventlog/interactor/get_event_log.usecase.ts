import { EventLogAttributes } from './../../../../models/event_log.model';
import BaseInteractor from "../../base.interactor";
import LogRepository from '../repository/event_log.repository';
import { inject, injectable } from 'tsyringe';
import RepositoryToken from '../../../../constants/repository.token';
import InvalidTokenError from '../../../../error/invalid_token.error';

export interface GetEventLogUseCaseParam {
    id: string
}

@injectable()
class GetEventLogUseCase extends BaseInteractor<EventLogAttributes, GetEventLogUseCaseParam> {

    private readonly eventLogRepository: LogRepository

    constructor(@inject(RepositoryToken.LOG_REPOSITORY) eventLogRepository: LogRepository) {
        super()
        this.eventLogRepository = eventLogRepository
    }

    protected buildPromise(param: GetEventLogUseCaseParam): Promise<EventLogAttributes> {
        return this.eventLogRepository.getEventLogById({ id: param.id }).catch((_) => {
            throw new InvalidTokenError()
        })
    }

}

export default GetEventLogUseCase