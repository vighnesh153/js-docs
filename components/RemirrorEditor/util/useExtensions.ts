/**
 * @author Vighnesh Raut <me@vighnesh153.com>
 */

import { useCallback } from 'react';
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  HistoryExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TrailingNodeExtension,
  UnderlineExtension,
} from 'remirror/extensions';
import { ExtensionPriority } from 'remirror';

import jsx from 'refractor/lang/jsx';
import typescript from 'refractor/lang/typescript';
import bash from 'refractor/lang/bash';

interface UseExtensionProps {
  placeholder?: string;
}

const useExtensions = (props: UseExtensionProps) => {
  return useCallback(
    () => [
      new PlaceholderExtension({ placeholder: props.placeholder }),

      /**
       * Link
       */
      new LinkExtension({ autoLink: true }),

      /**
       * Simple formatting
       */
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new StrikeExtension(),

      /**
       * h1, h2, h3, h4, h5, h6
       */
      new HeadingExtension({}),

      /**
       * Blockquote
       */
      new BlockquoteExtension(),

      /**
       * Text aligning
       */
      new NodeFormattingExtension(),

      /**
       * List
       */
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new ListItemExtension({
        priority: ExtensionPriority.High,
        enableCollapsible: true,
      }),

      /**
       * History: For undo and redo
       */
      new HistoryExtension({}),

      new CodeExtension(),
      new CodeBlockExtension({ supportedLanguages: [jsx, typescript, bash] }),

      /**
       * Ensure that there's always a trailing paragraph at the end of the document.
       */
      new TrailingNodeExtension(),

      // new TableExtension(),

      /**
       * Enables adding markdown in the editor
       */
      new MarkdownExtension({ copyAsMarkdown: false }),

      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension(),
    ],
    [props.placeholder]
  );
};

export default useExtensions;
