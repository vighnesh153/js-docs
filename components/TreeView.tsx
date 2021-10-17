import React, { useContext, useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';

import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';
import {
  TreeView as MuiTreeView,
  TreeItem as MuiTreeItem,
  TreeItemProps,
  treeItemClasses,
} from '@mui/lab';
import { Box } from '@mui/system';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FolderIcon from '@mui/icons-material/Folder';

import GlobalsContext from 'contexts/GlobalsContext';
import ExplorerItem from 'models/ExplorerItem';
import constructTree from 'util/constructTree';
import usePopulateTreeView from 'hooks/usePopulateTreeView';

import { MinusSquare, PlusSquare } from 'components/icons';

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

const TreeItem = styled((props: TreeItemProps) => (
  <MuiTreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
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
}));

const getRootLabel = (text: string) => (
  <Box display={'flex'} alignItems={'center'} gap={1} py={0.2}>
    <FolderIcon />
    <span>{text}</span>
  </Box>
);

const getLabel = (item: ExplorerItem): React.ReactNode => {
  return (
    <Box display={'flex'} alignItems={'center'} gap={1} py={0.2}>
      {item.type === 'file' ? <InsertDriveFileOutlinedIcon /> : <FolderIcon />}
      <span>{item.name}</span>
    </Box>
  );
};

const TreeView: React.FC<Omit<React.HTMLProps<HTMLUListElement>, 'as' | 'ref'>> = ({
  selected,
  ...props
}) => {
  usePopulateTreeView({ fetchOnMount: true });
  const globalsContext = useContext(GlobalsContext);

  const tree = useMemo(
    () => constructTree(globalsContext.explorerItems.filter((item) => !item.deletedOn)),
    [globalsContext.explorerItems]
  );

  const onNodeFocus = (e: any, nodeId: string) => {
    const [nodeType, itemId] = nodeId.split('___');

    /**
     * Set the current focussed node id
     */
    if (globalsContext.focussedNodeId !== itemId) {
      globalsContext.setFocussedNodeId(itemId);
    }

    /**
     * If node is directory, return
     */
    if (nodeType === 'directory') return;

    /**
     * set the current focussed file id
     */
    if (globalsContext.focussedFileId !== itemId) {
      globalsContext.setFocussedFileId(itemId);
    }

    /**
     * If file already open, do nothing
     */
    if (globalsContext.openFileIds.includes(itemId)) return;

    /**
     * If file not open, add it to the openFileIds list
     */
    const openFileIds = [...globalsContext.openFileIds, itemId];
    globalsContext.setOpenFileIds(openFileIds);
  };

  const onNodeToggle = (e: any, nodeIds: string[]) => {
    globalsContext.setExpandedExplorerItemIds([...nodeIds]);
  };

  const createTree = (items: ExplorerItem[]) => {
    return items.map((item) => (
      <TreeItem
        key={item.id || ''}
        nodeId={`${item.type}___${item.id || ''}`} // This prefix is being used in onNodeFocus function
        label={getLabel(item)}
        children={item.type === 'directory' ? createTree(item.content || []) : null}
      />
    ));
  };

  /**
   * Expand the public directory by default
   */
  useEffect(() => {
    globalsContext.setExpandedExplorerItemIds(['directory___public']);
  }, []);

  return (
    <MuiTreeView
      {...props}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={null}
      expanded={globalsContext.expandedExplorerItemIds}
      onNodeFocus={onNodeFocus}
      onNodeToggle={onNodeToggle}
      selected={
        globalsContext.focussedNodeId
          ? `${
              globalsContext.focussedNodeId === globalsContext.focussedFileId ? 'file' : 'directory'
            }___${globalsContext.focussedNodeId}`
          : 'directory___public'
      }
      sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      <TreeItem nodeId={'directory___public'} label={getRootLabel('Public')}>
        {createTree(tree.public)}
      </TreeItem>
      <TreeItem nodeId={'directory___private'} label={getRootLabel('Private')}>
        {createTree(tree.private)}
      </TreeItem>
    </MuiTreeView>
  );
};

export default TreeView;
export { TreeItem };
