import { injectable } from "tsyringe";
import LogModel, { EventLogAttributes } from "../../../../../models/event_log.model";
import { GetEventLogById, SaveEventLogRequest } from "../../../../domain/eventlog/repository/event_log.repository";
import BaseDBDataEntity from "../../../base/base_db.data.entity";
import EventLogEntityData from "../../event_log.entity.data";

@injectable()
class DBEventLogEntityData extends BaseDBDataEntity implements EventLogEntityData {

    getEventLogById(param: GetEventLogById): Promise<EventLogAttributes> {
        return this.wrapperWithDataNotFound("Event Log", LogModel.findOne({
            where: {
                id: param.id
            }
        }))
    }

    saveEventLog(request: SaveEventLogRequest): Promise<EventLogAttributes> {
        return LogModel.create({
            status: request.status,
            type: request.activityType,
            userType: request.userType,
            userId: request.userId
        })
    }
}

export default DBEventLogEntityData