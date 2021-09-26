import * as React from 'react';
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

import { CloseSquare, MinusSquare, PlusSquare } from 'components/icons';

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
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.label}`]: {
    whiteSpace: 'nowrap',
  },
}));

const TreeView = () => {
  return (
    <MuiTreeView
      aria-label="customized"
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Main">
        <TreeItem nodeId="2" label="Hello" />
        <TreeItem nodeId="3" label="Subtree with children">
          <TreeItem nodeId="6" label="Hello" />
          <TreeItem nodeId="7" label="Sub-subtree with children">
            <TreeItem nodeId="9" label="Child 1" />
            <TreeItem nodeId="10" label="Child 2" />
            <TreeItem nodeId="11" label="Child 3" />
            <TreeItem nodeId="12" label="Child 3">
              <TreeItem nodeId="13" label="Child 3" />
              <TreeItem nodeId="14" label="Child 3">
                <TreeItem nodeId="15" label="Sub-subtree with children">
                  <TreeItem nodeId="16" label="Sub-subtree with children" />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="8" label="Hello" />
        </TreeItem>
        <TreeItem nodeId="4" label="World" />
        <TreeItem nodeId="5" label="Something something" />
        <TreeItem nodeId="005" label="Something something" />
        <TreeItem nodeId="015" label="Something something" />
        <TreeItem nodeId="025" label="Something something" />
        <TreeItem nodeId="035" label="Something something" />
        <TreeItem nodeId="045" label="Something something" />
        <TreeItem nodeId="055" label="Something something" />
        <TreeItem nodeId="065" label="Something something" />
        <TreeItem nodeId="075" label="Something something" />
        <TreeItem nodeId="085" label="Something something" />
      </TreeItem>
    </MuiTreeView>
  );
};

export default TreeView;
export { TreeItem };
