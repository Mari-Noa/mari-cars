/** Business code depends on this interface only, so local disk can be swapped for S3 later. */
export interface StorageDriver {
  put(key: string, data: Buffer, contentType: string): Promise<void>;
  delete(key: string): Promise<void>;
  publicUrl(key: string): string;
}

export const STORAGE_DRIVER = Symbol('STORAGE_DRIVER');
