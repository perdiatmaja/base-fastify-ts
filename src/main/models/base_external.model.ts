import { Column, DataType, PrimaryKey } from "sequelize-typescript";
import BaseModel from "./base.model";

abstract class BaseExternalModel<A extends {}> extends BaseModel<A> {
    @Column({
        type: DataType.BIGINT,
        defaultValue: DataType.UUIDV4
    })
    external_id!: string
}

export default BaseExternalModel