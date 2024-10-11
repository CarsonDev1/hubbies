import z from 'zod';

export const RegisterBody = z.object({
	// username: z.string().min(1, 'Username is required'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
	// confirmPassword: z.string().min(6, 'Password confirmation is required'),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ['confirmPassword'],
// });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
	data: z.object({
		expiresAt: z.string(),
		account: z.object({
			id: z.number(),
			name: z.string(),
			email: z.string(),
		}),
	}),
	message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6)
			.max(100)
			.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
			.regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
	})
	.strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
