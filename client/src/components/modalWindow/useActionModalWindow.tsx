import { useAppDispatch, useAppSelector } from 'store';
import {
  openActionModalWindow,
  selectActionModalWindowContent,
  selectActionModalWindowIsOpen,
} from 'store/ui';
import { ModalWindow as ModalWindowEl } from './ModalWindow/ModalWindow';
import { ActionModalWindowProps, ModalWindowContent } from 'components';

const useActionModalWindow = () => {
  const dispatch = useAppDispatch();

  const content = useAppSelector(selectActionModalWindowContent);
  const isOpen = useAppSelector(selectActionModalWindowIsOpen);

  const showActionModalWindow = (props: ModalWindowContent) => {
    dispatch(openActionModalWindow(props));
  };

  const handleAccept = (onAcceptCb: () => void) => {
    onAcceptCb();
  };

  const handleCancel = (onCancelCb: (() => void) | undefined) => {
    onCancelCb && onCancelCb();
  };

  const ActionModalWindow = ({
    onAcceptCb,
    onCancelCb,
  }: ActionModalWindowProps) => (
    <ModalWindowEl
      content={content}
      isOpen={isOpen}
      onAcceptCb={() => handleAccept(onAcceptCb)}
      onCancelCb={() => handleCancel(onCancelCb)}
    />
  );

  return { showActionModalWindow, ActionModalWindow };
};

export { useActionModalWindow };
