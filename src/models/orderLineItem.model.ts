import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Order } from "./order.model";

interface OrderLineItemAttributes {
  id: number;
  order_id: number;
  listing_picture_url?: string;
  listing_name?: string;
  order_quantity?: number;
  sku?: string;
  price?: number;
}

interface OrderLineItemCreationAttributes
  extends Optional<OrderLineItemAttributes, "id"> {}

export class OrderLineItem
  extends Model<OrderLineItemAttributes, OrderLineItemCreationAttributes>
  implements OrderLineItemAttributes
{
  public id!: number;
  public order_id!: number;
  public listing_picture_url?: string;
  public listing_name?: string;
  public order_quantity?: number;
  public sku?: string;
  public price?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderLineItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    listing_picture_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    listing_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    order_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sku: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "OrderLineItem",
    tableName: "OrderLineItems",
    timestamps: false,
  }
);

Order.hasMany(OrderLineItem, { foreignKey: "order_id" });
OrderLineItem.belongsTo(Order, { foreignKey: "order_id" });
