export type MetaLegendKV = {
  key: string;
  value: string;
  emoji: string;
  baseColor: string;
};

export enum BlockTypes {
  KeyValueBlock,
  KeyBoardShortcutBlock,
  LatexBlock,
  CodeBlock,
  ListBlock,
}

export type BlockType = {
  name: string;
  description: string;
  meta?: MetaLegendKV[];
  type: BlockTypes;
};

type KeyValueBlockItem = {
  key: string;
  value: string;
};

export interface CodeBlock extends BlockType {
  content: string;
  language: string;
  filename: string;
}

export interface ListBlock extends BlockType {
  isOrdered: boolean;
  content: Array<string>;
}

export interface LatexBlock extends BlockType {
  content: string;
}

export interface KeyValueBlock extends BlockType {
  content: KeyValueBlockItem[];
}

export interface KeyBoardShortcutBlock extends BlockType {
  content: KeyValueBlockItem[];
}

export type CheatSheetType = {
  authorname: string;
  cheatsheetname: string;
  description: string;
  lastupdated: Date;
  tags?: string[];
  about?: KeyValueBlockItem[];
  items: BlockType[];
};

export enum AccentColorType {
  Kurunji,
  Mullai,
  Marutham,
  Neithal,
  Palai,
}
