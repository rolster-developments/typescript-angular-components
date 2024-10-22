export interface ListFieldElement<T = any> {
  compareTo(value: T): boolean;
  description: string;
  filtrable(pattern?: string): boolean;
  title: string;
  value: T;
  avatar?: string;
  icon?: string;
  initials?: string;
  photo?: string;
  subtitle?: string;
}
