import { Sequelize } from 'sequelize';

import logger from '../../logger/logger';
import ImageModel from './models/Image';
import config from '../../../config/config';

class SequelizeDB {
  private readonly sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      ...config.dataSources.sequelize.dbConfig,
      logging: false
    });
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.initModels();

      await this.sequelize.sync({ force: process.env.NODE_ENV === 'test' });
      logger.info('Connection to the database has been established successfully.');
    } catch (error) {
      logger.error(`Unable to connect to the database:${error}`);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.sequelize.close();
      logger.info('Connection to the database has been closed successfully.');
    } catch (error) {
      logger.error(`Unable to disconnect from the database:\n ${error}`);
      throw error;
    }
  }

  async seedDatabase() {
    // await User.create({id: '123e4567-e89b-12d3-a456-426614174000', email: 'user@example.com'});
    // await Article.create({
    //     id: '123e4567-e89b-12d3-a456-426614174001',
    //     title: 'Demo Article',
    //     content: 'This is a demo article content.',
    //     authorId: '123e4567-e89b-12d3-a456-426614174000'
    // });
    // await Comment.create({
    //     id: '123e4567-e89b-12d3-a456-426614174002',
    //     text: 'This is a demo comment.',
    //     articleId: '123e4567-e89b-12d3-a456-426614174001'
    // })
  }

  async initModels() {
    ImageModel.initModel(this.sequelize);
  }
}

export default new SequelizeDB();
