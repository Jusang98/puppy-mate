import { User } from '@/domain/entities/User';
import bcrypt from 'bcrypt';
import { UserRepository } from '@/domain/repositories/UserRepository';
import { createClient } from '@/utils/supabase/server';

export class SbUserRepository implements UserRepository {
  async create(user: User): Promise<number> {
    const supabase = await createClient();

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: user.email,
          password: user.password, // 해싱된 비밀번호 저장
          nickname: user.nickname,
          profile_image_url: user.profile_image_url,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error creating user:', error.message);
        throw new Error('Failed to create user.');
      }

      return data.id;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error logging in:', error);
      return null;
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, data.password);
    if (!isPasswordValid) {
      console.error('Invalid password.');
      return null;
    }

    return new User(
      data.id,
      data.email,
      data.password, // 해싱된 비밀번호를 반환
      data.nickname,
      data.profileImageUrl,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  async findById(id: number): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }

    return new User(
      data.id,
      data.email,
      data.password,
      data.nickname,
      data.profileImageUrl,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error finding user by email:', error);
      return null;
    }

    return new User(
      data.id,
      data.email,
      data.password,
      data.nickname,
      data.profileImageUrl,
      new Date(data.created_at),
      new Date(data.updated_at)
    );
  }

  async findAll(): Promise<User[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      console.error('Error finding all users:', error);
      throw new Error('Failed to fetch users.');
    }

    return data.map((row: any) => {
      return new User(
        row.id,
        row.email,
        row.password,
        row.nickname,
        row.profileImageUrl,
        new Date(row.created_at),
        new Date(row.updated_at)
      );
    });
  }

  async update(id: number, updatedUser: Partial<User>): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase
      .from('users')
      .update({
        email: updatedUser.email,
        password: updatedUser.password, // 비밀번호는 해싱된 상태로 업데이트해야 합니다.
        nickname: updatedUser.nickname,
        profileImageUrl: updatedUser.profile_image_url,
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating user:', error);
      return false;
    }

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const supabase = await createClient();

    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }

    return true;
  }
}
