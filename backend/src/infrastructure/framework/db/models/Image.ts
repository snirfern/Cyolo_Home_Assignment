import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class ImageModel extends Model {
  public id!: string;
  public fileId!: string;
  public fileName!: string;
  public retention!: number;

  public static initModel(sequelize: Sequelize) {
    ImageModel.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: uuidv4
        },
        fileId: {
          type: DataTypes.STRING,
          allowNull: false
        },
        fileName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        retention: {
          type: DataTypes.INTEGER,
          defaultValue: 60
        }
      },
      {
        sequelize,
        modelName: 'ImageModel',
        tableName: 'images',
        timestamps: true
      }
    );
  }
}

export default ImageModel;
