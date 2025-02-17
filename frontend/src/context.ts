import React from 'react';
import FileStore from './store/fileStore';
import { ModalStore } from './store/modalStore';
import UiStore from './store/uiStore';
import FileController from './controllers/fileController';
import FileRepository from './repositories/fileRepo';

const fileStore = new FileStore();
const modalStore = new ModalStore();
const uiStore = new UiStore();
const fileRepository = new FileRepository();
const fileController = new FileController(
  fileRepository,
  fileStore,
  uiStore,
  modalStore
);

export const rootContext = {
  fileController: fileController,
  fileStore: fileStore,
  modalStore: modalStore,
  uiStore: uiStore,
};

export const AppContext = React.createContext(rootContext);

export const useAppContext = () => React.useContext(AppContext);
