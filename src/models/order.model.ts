import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface OrderAttributes {
  id: number;
  order_date?: Date;
  ship_by_date?: Date;
  required_shipping?: string;
  ship_to_first_name?: string;
  ship_to_last_name?: string;
  ship_to_address_city?: string;
  ship_to_address_state?: string;
  ship_to_address_zip?: string;
  ship_to_address_country?: string;
  marketplace?: string;
  order_number?: string;
  tags?: object;
  total_listings_in_order?: number;
  tracking_number?: string;
  order_update_date?: Date;
  carrier?: string;
  shipping_method?: string;
  tracking_url?: string;
  deliver_by_date?: Date;
  shipping_box_length?: number;
  shipping_box_width?: number;
  shipping_box_height?: number;
  shipping_box_unit?: string;
  shipping_box_weight?: number;
  shipping_box_weight_unit?: string;
  ship_to_company_name?: string;
  ship_to_address1?: string;
  ship_to_address2?: string;
  shipping_cost?: number;
  shipping_revenue?: number;
  sales_revenue?: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public order_date?: Date;
  public ship_by_date?: Date;
  public required_shipping?: string;
  public ship_to_first_name?: string;
  public ship_to_last_name?: string;
  public ship_to_address_city?: string;
  public ship_to_address_state?: string;
  public ship_to_address_zip?: string;
  public ship_to_address_country?: string;
  public marketplace?: string;
  public order_number?: string;
  public tags?: object;
  public total_listings_in_order?: number;
  public tracking_number?: string;
  public order_update_date?: Date;
  public carrier?: string;
  public shipping_method?: string;
  public tracking_url?: string;
  public deliver_by_date?: Date;
  public shipping_box_length?: number;
  public shipping_box_width?: number;
  public shipping_box_height?: number;
  public shipping_box_unit?: string;
  public shipping_box_weight?: number;
  public shipping_box_weight_unit?: string;
  public ship_to_company_name?: string;
  public ship_to_address1?: string;
  public ship_to_address2?: string;
  public shipping_cost?: number;
  public shipping_revenue?: number;
  public sales_revenue?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ship_by_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    required_shipping: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ship_to_first_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    ship_to_last_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    ship_to_address_city: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ship_to_address_state: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ship_to_address_zip: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ship_to_address_country: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    marketplace: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    order_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    total_listings_in_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tracking_number: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    order_update_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    carrier: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    shipping_method: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tracking_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    deliver_by_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shipping_box_length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    shipping_box_width: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    shipping_box_height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    shipping_box_unit: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    shipping_box_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    shipping_box_weight_unit: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    ship_to_company_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ship_to_address1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ship_to_address2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    shipping_revenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    sales_revenue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
