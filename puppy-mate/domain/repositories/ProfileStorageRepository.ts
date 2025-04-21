export interface ProfileImageRepository {
  save(file: File): Promise<string>;
}
