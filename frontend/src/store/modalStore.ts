import { action, makeAutoObservable } from 'mobx';

export enum ModalType {
  NewFileCreationModal = 'newFileCreationModal',
}

export class ModalStore {
  selectedModal: string | null;

  constructor() {
    this.selectedModal = null;
    makeAutoObservable(this);
  }

  @action
  setModal = (selectedModal: ModalType | null) => {
    this.selectedModal = selectedModal;
  };
}
