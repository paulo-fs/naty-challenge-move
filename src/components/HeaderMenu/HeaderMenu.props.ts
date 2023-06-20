export interface IMenuLink {
  title: string;
  url: string;
}

export interface ISettings {
  title: string;
  url?: string;
  action: () => void;
}

export interface HeaderMenuProps {
  pages?: IMenuLink[] | null;
  settings?: ISettings[] | null;
}
