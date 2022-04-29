import { Model } from "sequelize-typescript";

abstract class BaseModel<A> extends Model<A> {
}

export default BaseModel