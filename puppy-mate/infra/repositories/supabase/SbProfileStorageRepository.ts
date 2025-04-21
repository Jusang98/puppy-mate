import { ProfileImageRepository } from '@/domain/repositories/ProfileStorageRepository';
import { createClient } from '@/utils/supabase/server';

export class SbProfileStorageRepository implements ProfileImageRepository {
  async save(file: File): Promise<string> {
    const supabase = await createClient();

    const bucketName = 'profile-images';
    const folderPath = 'product';

    // 안전한 파일명으로 변환
    const originalName = file.name
      .normalize('NFKD') // 한글/특수문자 분해
      .replace(/[\u0300-\u036F]/g, '') // 악센트 제거
      .replace(/[^\w.]+/g, '_') // 한글, 특수문자 → 언더스코어
      .replace(/_+/g, '_') // 언더스코어 연속 제거
      .toLowerCase();

    const timestamp = Date.now();
    let fileName = `${timestamp}_${originalName}`;
    let filePath = `${folderPath}/${fileName}`;
    let counter = 1;

    // 중복된 파일명 방지
    while (true) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(folderPath, { search: fileName });

      if (error)
        throw new Error(`Error checking file existence: ${error.message}`);

      if (
        data &&
        data.some((item: { name: string }) => item.name === fileName)
      ) {
        const [name, extension] = fileName.split(/\.(?=[^\.]+$)/);
        fileName = `${name}_${counter}.${extension}`;
        filePath = `${folderPath}/${fileName}`;
        counter++;
      } else {
        break;
      }
    }

    // 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Failed to upload file: ${uploadError.message}`);
    }

    return uploadData?.path || '';
  }
}
