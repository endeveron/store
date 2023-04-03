import { useAppDispatch, useAppSelector } from 'store';
import {
  openModalWindow,
  selectModalWindowContent,
  selectModalWindowIsOpen,
} from 'store/ui';
import { ModalWindow as ModalWindowEl } from './ModalWindow/ModalWindow';

const useModalWindow = () => {
  const dispatch = useAppDispatch();

  const content = useAppSelector(selectModalWindowContent);
  const isOpen = useAppSelector(selectModalWindowIsOpen);

  const showModalWindow = ({
    title = 'Oops!',
    message = 'Something went wrong.',
  }) => {
    dispatch(
      openModalWindow({
        title,
        message,
      })
    );
  };

  const ModalWindow = () => <ModalWindowEl content={content} isOpen={isOpen} />;

  return { showModalWindow, ModalWindow };
};

export { useModalWindow };
