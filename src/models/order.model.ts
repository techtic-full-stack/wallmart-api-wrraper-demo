import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface OrderAttributes {
  id: string;
  order_number: string;
  customer_order_id: string;
  customer_email_id: string;
  order_date: Date;
  status: string;
  shipping_info: object;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: string;
  public order_number!: string;
  public customer_order_id!: string;
  public customer_email_id!: string;
  public order_date!: Date;
  public status!: string;
  public shipping_info!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "order_number",
    },
    customer_order_id: {
      type: DataTypes.STRING,
      field: "customer_order_id",
    },
    customer_email_id: {
      type: DataTypes.STRING,
      field: "customer_email_id",
    },
    order_date: {
      type: DataTypes.DATE,
      field: "order_date",
    },
    status: {
      type: DataTypes.STRING,
      field: "status",
    },
    shipping_info: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "shipping_info",
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
  }
);
