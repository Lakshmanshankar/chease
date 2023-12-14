export type CheaseUser = {
  id?: string,
  username: string,
  email: string,
  password: string,
}

export type MetaLegendKV = {
  key: string,
  value: string,
  emoji: string,
  baseColor: string,
}

export enum BlockTypes {
  KeyValueBlock,
  KeyBoardShortcutBlock,
  LatexBlock,
  CodeBlock,
  ListBlock,
}

export type BlockType = {
  name: string,
  description: string
  meta?: MetaLegendKV[]
  type: BlockTypes
}

type KeyValueBlockItem = {
  key: string,
  value: string
}

export interface CodeBlock extends BlockType {
  content: string,
  language: string,
}

export interface ListBlock extends BlockType {
  content: Array<string>;
}

export interface LatexBlock extends BlockType {
  content: string;
}

export interface KeyValueBlock extends BlockType {
  content: KeyValueBlockItem[]
}

export interface KeyBoardShortcutBlock extends BlockType {
  content: KeyValueBlockItem[]
}

export type CheatSheetType = {
  authorname: string,
  cheatsheetname: string,
  description: string,
  lastupdated:Date,
  tags?: string[]
  about?: KeyValueBlockItem[]
  items: BlockType[];
}

export enum AccentColorType {
  Kurunji, Mullai, Marutham, Neithal, Palai
}

export type CheaseUserProfile = {
  id: string,
  email: string,
  username: string,
  about?:string,
  password:string,
  accentColor:AccentColorType;
}

export type DatabaseResult = {
  result:boolean,
  data:any
}