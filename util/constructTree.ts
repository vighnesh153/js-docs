import ExploreItem from 'models/ExploreItem';
import Tree from 'models/Tree';

const constructTree = (items: ExploreItem[]): Tree => {
  const tree: Tree = {
    public: [],
    private: [],
  };

  const childItems: { [id: string]: ExploreItem[] } = {};

  // Segregate items in their parentId's bucket
  items.forEach((item) => {
    if (item.parentId) {
      childItems[item.parentId] = childItems[item.parentId] || [];
      childItems[item.parentId].push(item);
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
