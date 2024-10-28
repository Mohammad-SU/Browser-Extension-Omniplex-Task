export interface TagInfo {
  tagName: string;
  href?: string;
}

export interface PageData {
  url: string;
  elements: TagInfo[];
}

export interface MessageType = {
  type: 'STORE_ELEMENTS';
  data: PageData;
}
