interface ExplorerItemProps {
  id: string;
  name: string;

  createdOn?: string;
  createdBy?: string;
  updatedOn?: string;
  updatedBy?: string;
  deletedOn?: string;
  deletedBy?: string;

  /**
   * ['src', 'components', 'common'] means src > components > common > File
   */
  parentIds: string[];

  isPrivate?: boolean;
}

export default ExplorerItemProps;
