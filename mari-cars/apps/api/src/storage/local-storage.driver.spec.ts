import { describe, expect, it } from 'vitest';
import { LocalStorageDriver } from './local-storage.driver';

describe('LocalStorageDriver', () => {
  const driver = new LocalStorageDriver('/tmp/mari-cars-test', 'http://x/media');

  it('builds public URLs', () => {
    expect(driver.publicUrl('a/b.webp')).toBe('http://x/media/a/b.webp');
  });

  it('rejects path traversal', async () => {
    await expect(driver.put('../evil.txt', Buffer.from('x'))).rejects.toThrow('Invalid storage key');
  });
});
