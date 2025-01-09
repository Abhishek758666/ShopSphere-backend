import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "orderDetails",
  modelName: "OrderDetail",
  timestamps: true,
})
class OrderDetail extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phonenumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare shippingAddress: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare totlaAmount: number;

  @Column({
    type: DataType.ENUM(
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled"
    ),
    defaultValue: "pending",
  })
  declare orderStatus: number;
}

export default OrderDetail;
