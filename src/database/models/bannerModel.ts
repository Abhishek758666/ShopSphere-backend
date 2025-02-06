import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "banners",
  modelName: "Banner",
  timestamps: true,
})
class Banner extends Model {
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
  declare bannerImage: string;
}

export default Banner;
