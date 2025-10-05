// GlobalModalManager.ts
class GlobalModalManager {
  private static instance: GlobalModalManager | null = null;
  private modalInstance: any = null;
  private isInitialized: boolean = false;

  private constructor() {
    console.log('GlobalModalManager 初始化');
  }

  public static getInstance(): GlobalModalManager {
    if (!GlobalModalManager.instance) {
      GlobalModalManager.instance = new GlobalModalManager();
    }
    return GlobalModalManager.instance;
  }

  public initialize(modalRef: any): boolean {
    if (!this.isInitialized && modalRef) {
      this.modalInstance = modalRef;
      this.isInitialized = true;
      console.log('Modal 初始化成功');
      return true;
    }
    console.log('Modal 已初始化，跳过重复初始化');
    return false;
  }

  public getModal(): any {
    return this.modalInstance;
  }

  public reset(): void {
    this.modalInstance = null;
    this.isInitialized = false;
    console.log('Modal 已重置');
  }

  // 业务方法
  public show(): void {
    if (this.modalInstance && this.modalInstance.show) {
      this.modalInstance.show();
    }
  }

  public hide(): void {
    if (this.modalInstance && this.modalInstance.hide) {
      this.modalInstance.hide();
    }
  }
}

export default GlobalModalManager;
