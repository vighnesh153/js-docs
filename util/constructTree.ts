import ExplorerItem from 'models/ExploreItem';
import Tree from 'models/Tree';

const constructTree = (items: ExplorerItem[]): Tree => {
  const tree: Tree = {
    public: [],
    private: [],
  };

  const childItems: { [id: string]: ExplorerItem[] } = {};

  // Segregate items in their parentId's bucket
  items.forEach((item) => {
    if (item.parentIds.length > 0) {
      const closestParent = item.parentIds[item.parentIds.length - 1];
      childItems[closestParent] = childItems[closestParent] || [];
      childItems[closestParent].push(item);
    } else {
      item.isPrivate ? tree.private.push(item) : tree.public.push(item);
    }
  });

  // Assign the parent's bucket to the parent
  items.forEach((item) => {
    if (item.type === 'directory') {
      item.content = childItems[item.id || ''] || [];
    }
  });

  return tree;
};

export default constructTree;
