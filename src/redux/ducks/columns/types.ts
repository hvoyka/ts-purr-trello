export type DeskColumns = Record<string, DeskColumn>;

export interface DeskColumn {
  id: string;
  title: string;
}

export interface ColumnsData {
  data: DeskColumns;
}
