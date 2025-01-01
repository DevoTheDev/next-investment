export type Detail = {
    [key: string]: any;
};

export type Visibility = {
  visible?: boolean;
};

export type Config<T> = Visibility & {
  container?: React.HTMLAttributes<HTMLDivElement>;
  keyValueContainer?: React.HTMLAttributes<HTMLDivElement>;
  keyRef?: React.HTMLAttributes<HTMLDivElement>;
  value?: React.HTMLAttributes<HTMLDivElement>;
};

export type MappedDetails<T extends object, Seperator extends string, ConfigType> = {
  [K in keyof T as `${Seperator}${string & K}`]?: ConfigType;
}






