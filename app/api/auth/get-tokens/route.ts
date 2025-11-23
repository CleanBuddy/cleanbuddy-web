import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value || null;
    const refreshToken = cookieStore.get('refreshToken')?.value || null;

    return NextResponse.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Failed to get auth cookies:', error);
    return NextResponse.json({ accessToken: null, refreshToken: null }, { status: 500 });
  }
}
