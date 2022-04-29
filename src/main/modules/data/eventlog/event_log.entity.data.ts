import { EventLogAttributes } from "../../../models/event_log.model";
import { GetEventLogById, SaveEventLogRequest } from "../../domain/eventlog/repository/event_log.repository";
import BaseEntityData from "../base/base_entity.data";

interface EventLogEntityData extends BaseEntityData {
    saveEventLog(request: SaveEventLogRequest): Promise<EventLogAttributes>
    getEventLogById(param: GetEventLogById): Promise<EventLogAttributes>
}

export default EventLogEntityData