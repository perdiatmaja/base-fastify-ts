import { EventLogAttributes } from "../../../../models/event_log.model"

export interface SaveEventLogRequest {
    activityType: string
    userType: string
    userId: string
    status: number
}

export interface GetEventLogById {
    id: string
}

interface EventLogRepository {
    saveEventLog(request: SaveEventLogRequest): Promise<EventLogAttributes>
    getEventLogById(param: GetEventLogById): Promise<EventLogAttributes>
}

export default EventLogRepository