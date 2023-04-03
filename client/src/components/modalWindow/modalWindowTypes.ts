export interface ModalWindowContent {
  title: string;
  message: string;
  status?: string;
  btnText?: string;
  btnType?: string;
  secondBtnText?: string;
}

export interface ModalWindowProps {
  content: ModalWindowContent;
  isOpen: boolean;
  onAcceptCb?: () => void;
  onCancelCb?: () => void;
}

export interface ActionModalWindowProps {
  onAcceptCb: () => void;
  onCancelCb?: () => void;
}
