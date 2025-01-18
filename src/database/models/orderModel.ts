import { Table, Column, Model, DataType } from "sequelize-typescript";
import { OrderStatus } from "../../types/orderTypes";

@Table({
  tableName: "orders",
  modelName: "Order",
  timestamps: true,
})
class Order extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare phoneNumber: string;

  @Column({
    type: DataType.STRING,
  })
  declare shippingAddress: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare totalAmount: number;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    defaultValue: "pending",
  })
  declare orderStatus: number;
}

export default Order;
