import React, { useContext, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';

import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';
import { TreeView as MuiTreeView, TreeItem as MuiTreeItem, TreeItemProps, treeItemClasses } from '@mui/lab';

import { CloseSquare, MinusSquare, PlusSquare } from 'components/icons';

import ExplorerItem from 'models/ExplorerItem';

import GlobalsContext from 'contexts/GlobalsContext';

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
  const globalsContext = useContext(GlobalsContext);

  const tree = useMemo(() => constructTree(globalsContext.explorerItems), [globalsContext.explorerItems]);

  const onNodeFocus = (e: any, nodeId: string) => {
    if (nodeId.startsWith('directory')) return;

    const fileId = nodeId.split('___')[1];

    if (globalsContext.focussedFileId !== fileId) {
      globalsContext.setFocussedFileId(fileId);
    }

    if (globalsContext.openFileIds.includes(fileId)) return;

    const openFileIds = [...globalsContext.openFileIds, fileId];
    globalsContext.setOpenFileIds(openFileIds);
  };

  const createTree = (items: ExplorerItem[]) => {
    return items.map((item) => (
      <TreeItem
        key={item.id || ''}
        nodeId={`${item.type}___${item.id || ''}`}
        label={item.name}
        children={item.type === 'directory' ? createTree(item.content || []) : null}
      />
    ));
  };

  return (
    <MuiTreeView
      {...props}
      defaultExpanded={['public']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      onNodeFocus={onNodeFocus}
      multiSelect
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
