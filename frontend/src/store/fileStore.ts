import { action, computed, makeAutoObservable } from 'mobx';

class FileStore {
  private newFileUrl: string;
  private loading: boolean;

  constructor() {
    this.newFileUrl = '';
    this.loading = false;
    makeAutoObservable(this);
  }

  @action
  setLoading() {
    this.loading = !this.loading;
  }

  @action
  setNewFileUrl(newFileUrl: string) {
    this.newFileUrl = newFileUrl;
  }

  @computed
  getNewFileLink(): string {
    return this.newFileUrl;
  }

  @computed
  isLoading(): boolean {
    return this.loading;
  }
}

export default FileStore;
