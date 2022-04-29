import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import TABLE_NAME from "../constants/table_name.constant";
import BaseModel from "./base.model";

export interface AdminAttributes {
    id: string
    email: string
    name: string
    password: string
    role: number
    status: number
    avatarUri?: string
}

@Table({ modelName: TABLE_NAME.ADMIN })
class AdminModel extends BaseModel<AdminAttributes> implements AdminAttributes {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id!: string

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
        unique: true
    })
    email!: string

    @Column({
        type: DataType.STRING(32),
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING(64),
        allowNull: false
    })
    password!: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 5
    })
    role!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0
    })
    status!: number

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    avatarUri?: string
}

export default AdminModel