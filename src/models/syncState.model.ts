// models/syncState.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface SyncStateAttributes {
  id: string;
  key: string;
  value: string;
}

interface SyncStateCreationAttributes extends Optional<SyncStateAttributes, "id"> {}

export class SyncState
  extends Model<SyncStateAttributes, SyncStateCreationAttributes>
  implements SyncStateAttributes
{
  public id!: string;
  public key!: string;
  public value!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SyncState.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "SyncState",
    tableName: "sync_states",
    timestamps: true,
  }
);
