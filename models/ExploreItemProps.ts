interface ExploreItemProps {
  id?: string;
  name?: string;

  createdOn?: number;
  createdBy?: string;
  updatedOn?: number;
  updatedBy?: string;
  deletedOn?: number | null;
  deletedBy?: string | null;

  parentId?: string;
  isPrivate?: boolean;
}

export default ExploreItemProps;
