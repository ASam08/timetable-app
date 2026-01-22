'use server';

import postgres from 'postgres';

import { Version } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!);


export async function testConnection() {
    try {
        const data = await sql`SELECT version()`;
        console.log('Database connection successful:', data);
        return data;
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
}