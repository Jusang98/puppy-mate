export interface StorageRepository {
  save(file: File): Promise<string>;
  getPublicUrl(fileName: string): Promise<string> 
}
