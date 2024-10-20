import { RlsTheme } from '../types';

export interface ConfirmationAction {
  label: string;
  click?: () => void;
  theme?: RlsTheme;
}

export interface ConfirmationOptions {
  message: string;
  approve?: ConfirmationAction;
  description?: string;
  logo?: string;
  reject?: ConfirmationAction;
  subtitle?: string;
  title?: string;
}

export interface ModalConfirmationOptions extends ConfirmationOptions {
  closing?: () => void;
  opening?: () => void;
}
