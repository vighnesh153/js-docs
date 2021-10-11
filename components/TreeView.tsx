import * as React from 'react';
import { useSpring, animated } from 'react-spring';

import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';
import { TreeView as MuiTreeView, TreeItem as MuiTreeItem, TreeItemProps, treeItemClasses } from '@mui/lab';

import { CloseSquare, MinusSquare, PlusSquare } from 'components/icons';

import ExploreFile from 'models/ExploreFile';
import ExploreDirectory from 'models/ExploreDirectory';
import ExploreItem from 'models/ExploreItem';

import constructTree from 'util/constructTree';

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const TreeItem = styled((props: TreeItemProps) => <MuiTreeItem {...props} TransitionComponent={TransitionComponent} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 10,
      paddingLeft: 10,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
    [`& .${treeItemClasses.label}`]: {
      whiteSpace: 'nowrap',
    },
  })
);

interface TreeViewProps extends Omit<React.HTMLProps<HTMLUListElement>, 'as' | 'ref'> {}

const TreeView: React.FC<TreeViewProps> = ({ selected, ...props }) => {
  const items: ExploreItem[] = [
    {
      id: 'dir-001',
      name: 'Dir 1',
      type: 'directory',
    },
    {
      id: 'dir-002',
      name: 'Dir 2',
      type: 'directory',
    },
    {
      id: 'dir-004',
      name: 'Dir 4',
      type: 'directory',
      parentId: 'dir-002',
    },
    {
      id: 'file-004',
      name: 'File 4',
      type: 'file',
      parentId: 'dir-004',
    },
    {
      id: 'file-001',
      name: 'File 1',
      type: 'file',
      parentId: 'dir-001',
    },
    {
      id: 'file-002',
      name: 'File 2',
      type: 'file',
      parentId: 'dir-002',
    },
    {
      id: 'file-003',
      name: 'File 3',
      type: 'file',
      parentId: 'dir-003',
    },
    {
      id: 'dir-003',
      name: 'Dir 3',
      type: 'directory',
    },
  ];

  const tree = constructTree(items);

  const createTree = (items: (ExploreFile | ExploreDirectory)[]) => {
    return items.map((item) =>
      item.type === 'directory' ? (
        <TreeItem key={item.id || ''} nodeId={item.id || ''} label={item.name}>
          {createTree(item.content || [])}
        </TreeItem>
      ) : (
        <TreeItem key={item.id || ''} nodeId={item.id || ''} label={item.name} />
      )
    );
  };

  return (
    <MuiTreeView
      {...props}
      defaultExpanded={['public']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      <TreeItem nodeId={'public'} label={'Public'}>
        {createTree(tree.public)}
      </TreeItem>
      <TreeItem nodeId={'private'} label={'Private'}>
        {createTree(tree.private)}
      </TreeItem>
    </MuiTreeView>
  );
};

export default TreeView;
export { TreeItem };
