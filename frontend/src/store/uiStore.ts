import { action, makeAutoObservable } from 'mobx';

interface Alert {
  severity: 'success' | 'error';
  message: string;
}

class UiStore {
  alert: Alert | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setErrorAlert = (message: string) =>
    (this.alert = { severity: 'error', message: message });

  @action
  setSuccessAlert = (message: string) =>
    (this.alert = { severity: 'success', message: message });

  @action
  resetAlert() {
    this.alert = null;
  }
}

export default UiStore;
