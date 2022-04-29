import { injectable } from "tsyringe";
import BaseDataFactory from "../../base/base.data.factory";
import { DataSource } from "../../base/data.source";
import EventLogEntityData from "../event_log.entity.data";
import DBEventLogEntityData from "./db/db_event_log.entity.data";

@injectable()
class EventLogDataFactory extends BaseDataFactory<EventLogEntityData> {
    constructor(db: DBEventLogEntityData) {
        super(db)
    }
}

export default EventLogDataFactory