interface ExplorerItemProps {
  id: string;
  name: string;

  createdOn?: number;
  createdBy?: string;
  updatedOn?: number;
  updatedBy?: string;
  deletedOn?: number | null;
  deletedBy?: string | null;

  /**
   * ['src', 'components', 'common'] means src > components > common > File
   */
  parentIds: string[];

  isPrivate?: boolean;
}

export default ExplorerItemProps;
