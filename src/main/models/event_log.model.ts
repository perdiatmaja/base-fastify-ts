import { Column, DataType, Table } from "sequelize-typescript";
import TABLE_NAME from "../constants/table_name.constant";
import BaseModel from "./base.model";

export type EventLogAttributes = {
    id?: string
    type: string
    userType: string
    userId: string
    affectedTable?: string
    affectedId?: string
    status: number
    extendInfo?: string
}

@Table({ tableName: TABLE_NAME.EVENT_LOG })
class EventLogModel extends BaseModel<EventLogAttributes> {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true
    })
    id!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    type!: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userType!: string

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    userId!: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    affectedTable?: string

    @Column({
        type: DataType.UUID,
        allowNull: true
    })
    affectedId?: string

    @Column({
        type: DataType.INTEGER,
        defaultValue: -1
    })
    status!: number

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    extendInfo?: string
}

export default EventLogModel