import { EventLogAttributes } from '../../../models/event_log.model';
import { singleton } from "tsyringe";
import EventLogRepository, { GetEventLogById, SaveEventLogRequest } from "../../domain/eventlog/repository/event_log.repository";
import BaseEntityRepository from "../base/base_entity.repository";
import EventLogEntityData from "./event_log.entity.data";
import LogDataFactory from "./source/event_log.data.factory";

@singleton()
class EventLogEntityRepository extends BaseEntityRepository<EventLogEntityData> implements EventLogRepository {

    constructor(factory: LogDataFactory) {
        super(factory)
    }
    getEventLogById(param: GetEventLogById): Promise<EventLogAttributes> {
        return this.createDbData().getEventLogById(param)
    }

    saveEventLog(request: SaveEventLogRequest): Promise<EventLogAttributes> {
        return this.createDbData().saveEventLog(request)
    }
}

export default EventLogEntityRepository