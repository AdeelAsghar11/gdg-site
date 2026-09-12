'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styles from './Login.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlError = searchParams.get('error');
        if (urlError === 'CredentialsSignin') {
            setError('Invalid email or password.');
        } else if (urlError) {
            setError('Authentication failed. Please try again.');
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsPending(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password.');
                setIsPending(false);
            } else {
                // Success! Force a router refresh to update session and meta stats
                router.refresh();
                try {
                    const res = await fetch('/api/auth/session');
                    const contentType = res.headers.get('content-type');
                    if (res.ok && contentType && contentType.includes('application/json')) {
                        const session = await res.json();
                        const role = session?.user?.role;
                        if (role === 'admin') {
                            router.push('/admin');
                            return;
                        } else if (role === 'core') {
                            router.push('/core');
                            return;
                        }
                    }
                } catch {
                    // Ignore session parse error and default redirect
                }
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            setIsPending(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <span className="subheader">Members Portal</span>
                <h1>Login to GDGoC</h1>
                <p>Enter your credentials to access member-only resources.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <input 
                            name="email"
                            type="email" 
                            placeholder="name@example.com" 
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input 
                                name="password"
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="••••••••" 
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                style={{ width: '100%' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(p => !p)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    color: '#5F6368',
                                }}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p style={{ color: '#EA4335', fontSize: '0.875rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="btn-primary"
                        style={{ 
                            width: '100%', 
                            textAlign: 'center', 
                            display: 'block', 
                            border: 'none', 
                            cursor: isPending ? 'not-allowed' : 'pointer',
                            opacity: isPending ? 0.7 : 1
                        }}
                    >
                        {isPending ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className={styles.switch}>
                    Not a member yet? <Link href="/join">Apply here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
