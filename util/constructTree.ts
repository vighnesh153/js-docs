import ExplorerItem from 'models/ExplorerItem';
import Tree from 'models/Tree';

/**
 * Sorts the children based on the whether they are file or directory,
 * and in ascending order of name.
 */
const sortedChildren = (children: ExplorerItem[]): ExplorerItem[] => {
  const childrenCopy = [...children];
  return childrenCopy.sort((child1, child2) => {
    // Both are either "directory" or "file"
    if (child1.type === child2.type) return child1.name.localeCompare(child2.name);

    // 1 of them is "directory" and the other 1 is "file"
    if (child1.type === 'directory') return -1;
    return 1;
  });
};

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
      item.content = sortedChildren(childItems[item.id || ''] || []);
    }
  });

  // Sort the root directories
  tree.public = sortedChildren(tree.public);
  tree.private = sortedChildren(tree.private);

  return tree;
};

export default constructTree;
