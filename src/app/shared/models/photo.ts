export interface Photo {
  id: number;
  format?: string;
  width?: number;
  height?: number;
  filename?: string;
  author?: string;
  author_url?: string;
  post_url?: string;
  favorite?: boolean;
}
