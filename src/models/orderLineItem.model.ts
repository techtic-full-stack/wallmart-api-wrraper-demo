import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Order } from "./order.model";

interface OrderLineItemAttributes {
  id: string;
  order_id: string;
  line_number: string;
  product_name: string;
  sku: string;
  quantity: number;
  status: string;
  charges: object;
}

interface OrderLineItemCreationAttributes
  extends Optional<OrderLineItemAttributes, "id"> {}

export class OrderLineItem
  extends Model<OrderLineItemAttributes, OrderLineItemCreationAttributes>
  implements OrderLineItemAttributes
{
  public id!: string;
  public order_id!: string;
  public line_number!: string;
  public product_name!: string;
  public sku!: string;
  public quantity!: number;
  public status!: string;
  public charges!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderLineItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "order_id",
    },
    line_number: {
      type: DataTypes.STRING,
      field: "line_number",
    },
    product_name: {
      type: DataTypes.STRING,
      field: "product_name",
    },
    sku: {
      type: DataTypes.STRING,
      field: "sku",
    },
    quantity: {
      type: DataTypes.INTEGER,
      field: "quantity",
    },
    status: {
      type: DataTypes.STRING,
      field: "status",
    },
    charges: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "charges",
    },
  },
  {
    sequelize,
    modelName: "OrderLineItem",
    tableName: "order_line_items",
  }
);

Order.hasMany(OrderLineItem, { foreignKey: "order_id" });
OrderLineItem.belongsTo(Order, { foreignKey: "order_id" });
