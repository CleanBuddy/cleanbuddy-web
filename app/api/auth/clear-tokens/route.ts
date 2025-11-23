import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Clear auth cookies
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to clear auth cookies:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
