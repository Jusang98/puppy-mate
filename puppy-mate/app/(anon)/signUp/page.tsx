'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { createUser } from '@/api/user';
import { z } from 'zod';

// 🔐 Zod 스키마
const signupSchema = z.object({
  email: z.string().email({ message: '유효한 이메일을 입력해주세요.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  profileImageUrl: z
    .string()
    .trim()
    .transform((val) => (val === '' ? undefined : val)) // 빈 문자열 → undefined
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: '유효한 URL 형식이 아닙니다.',
    }),
});

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSignup = async () => {
    setErrorMessage('');

    // ✅ 입력값 유효성 검사
    const result = signupSchema.safeParse({
      email,
      password,
      nickname,
      profileImageUrl,
    });

    if (!result.success) {
      const firstError = Object.values(
        result.error.flatten().fieldErrors
      )[0]?.[0];
      setErrorMessage(firstError || '입력값을 확인해주세요.');
      return;
    }

    try {
      const userId = await createUser(
        email,
        password,
        nickname,
        profileImageUrl
      );
      console.log('User created with ID:', userId);
      router.push('/login');
    } catch (error) {
      setErrorMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-bold mb-4'>Sign Up</h2>

      <div className='w-80 space-y-4'>
        {errorMessage && (
          <div className='text-sm text-red-500 text-center'>{errorMessage}</div>
        )}

        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full'
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full'
        />
        <Input
          type='text'
          placeholder='Nickname'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className='w-full'
        />
        <Input
          type='text'
          placeholder='Profile Image URL (optional)'
          value={profileImageUrl}
          onChange={(e) => setProfileImageUrl(e.target.value)}
          className='w-full'
        />

        <Button onClick={handleSignup} className='w-full'>
          Create Account
        </Button>

        <div className='flex justify-between'>
          <Button onClick={handleBackToLogin} variant='ghost'>
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
