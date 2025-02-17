import FileRepository from '../repositories/fileRepo';
import FileStore from '../store/fileStore';
import UiStore from '../store/uiStore';
import { ModalStore, ModalType } from '../store/modalStore';

class FileController {
  private fileRepository: FileRepository;
  private fileStore: FileStore;
  private uiStore: UiStore;
  private modalStore: ModalStore;

  constructor(
    fileRepository: FileRepository,
    fileStore: FileStore,
    uiStore: UiStore,
    modalStore: ModalStore
  ) {
    this.fileRepository = fileRepository;
    this.fileStore = fileStore;
    this.uiStore = uiStore;
    this.modalStore = modalStore;
  }

  async uploadFile(data: { [key: string]: any }) {
    this.fileStore.setLoading();
    try {
      const newFileUrl = await this.fileRepository.uploadFile(
        data['newImage'],
        data['retentionTime']
      );
      this.fileStore.setNewFileUrl(newFileUrl);
      this.modalStore.setModal(ModalType.NewFileCreationModal);
    } catch (e) {
      console.log(e);
      this.uiStore.setErrorAlert('Failed to upload file');
    }
    this.fileStore.setLoading();
  }
}

export default FileController;
