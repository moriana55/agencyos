import { sql } from './db'

export async function getOrCreateAgency(clerkId: string, agencyName: string) {
  const rows = await sql`SELECT * FROM agencies WHERE clerk_id = ${clerkId}`
  if (rows.length > 0) return rows[0]
  const created = await sql`
    INSERT INTO agencies (clerk_id, name) VALUES (${clerkId}, ${agencyName})
    RETURNING *`
  return created[0]
}

export async function getClients(agencyId: string) {
  return sql`SELECT * FROM clients WHERE agency_id = ${agencyId} ORDER BY created_at DESC`
}

export async function createClient(agencyId: string, data: { name: string; industry?: string }) {
  const rows = await sql`
    INSERT INTO clients (agency_id, name, industry)
    VALUES (${agencyId}, ${data.name}, ${data.industry || null})
    RETURNING *`
  return rows[0]
}

export async function updateClient(id: string, agencyId: string, data: { name: string; industry?: string; status?: string }) {
  const rows = await sql`
    UPDATE clients SET name=${data.name}, industry=${data.industry||null}, status=${data.status||'active'}
    WHERE id=${id} AND agency_id=${agencyId}
    RETURNING *`
  return rows[0]
}

export async function deleteClient(id: string, agencyId: string) {
  await sql`DELETE FROM clients WHERE id=${id} AND agency_id=${agencyId}`
}
