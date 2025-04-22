import { StorageRepository } from '@/domain/repositories/StorageRepository';
import { createClient } from '@/utils/supabase/server';

export class SbStorageRepository implements StorageRepository {
  private readonly bucketName = 'images';
  private readonly profileFolderPath = 'profile';

  async save(file: File): Promise<string> {
    const supabase = await createClient();

    const originalName = file.name
      .normalize('NFKD')
      .replace(/[\u0300-\u036F]/g, '')
      .replace(/[^\w.]+/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();

    const timestamp = Date.now();
    let fileName = `${timestamp}_${originalName}`;
    let filePath = `${this.profileFolderPath}/${fileName}`;
    let counter = 1;

    while (true) {
      const { data, error } = await supabase.storage
        .from(this.bucketName)
        .list(this.profileFolderPath, { search: fileName });

      if (error) {
        throw new Error(`Error checking file existence: ${error.message}`);
      }

      if (data && data.some((item) => item.name === fileName)) {
        const [name, extension] = fileName.split(/\.(?=[^\.]+$)/);
        fileName = `${name}_${counter}.${extension}`;
        filePath = `${this.profileFolderPath}/${fileName}`;
        counter++;
      } else {
        break;
      }
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(this.bucketName)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    return uploadData?.path || '';
  }

  async getPublicUrl(filePath: string): Promise<string> {
    const supabase = await createClient();

    const { data } = supabase.storage
      .from(this.bucketName)
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
}
