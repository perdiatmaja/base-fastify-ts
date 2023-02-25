import { Column, DataType, Model, PrimaryKey } from "sequelize-typescript";

abstract class BaseModel<A extends {}> extends Model<A> {
    @PrimaryKey
    @Column({
        type: DataType.BIGINT
    })
    id!: string

    @Column({
        type: DataType.BIGINT,
        defaultValue: DataType.UUIDV4
    })
    external_id!: string
}

export default BaseModel