// src/actions/login/action.ts
'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { redirect } from 'next/navigation';

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Por favor, completa todos los campos.' };
  }

  try {
    // 1. Buscar al usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: 'Credenciales inválidas.' };
    }

    // 2. Hashear la contraseña ingresada con crypto (coincidiendo con el seed)
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // 3. Comparar hashes
    if (hashedPassword !== user.password) {
      return { error: 'Credenciales inválidas.' };
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { error: 'Ocurrió un error en el servidor.' };
  }

  // 4. Redirigir al panel principal de la tienda si es correcto
  redirect('/dashboard');
}