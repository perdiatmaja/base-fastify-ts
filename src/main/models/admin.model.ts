import { Column, DataType, Table } from "sequelize-typescript";
import TABLE_NAME from "../constants/table_name.constant";
import BaseExternalModel from "./base_external.model";

export interface AdminAttributes {
    id: string
    email: string
    name: string
    password: string
    role: number
    status: number
    avatar_uri?: string
}

@Table({ modelName: TABLE_NAME.ADMIN })
class AdminModel extends BaseExternalModel<AdminAttributes> implements AdminAttributes {
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
    avatar_uri?: string
}

export default AdminModel