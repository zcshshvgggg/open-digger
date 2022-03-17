import neo4j = require('neo4j-driver');
import parser = require('parse-neo4j');
import getConfig from '../config';

export async function getClient() {
  const driver = neo4j.driver((await getConfig()).db.neo4j.host);
  return driver;
}

export async function query<T = any>(query: string, params?: any): Promise<T[]> {
  const session = (await getClient()).session();
  const r = await session.run(query, params);
  await session.close();
  return parser.parse(r) as T[];
}

export function parseRecord<T = any>(record: any): T {
  return parser.parseRecord(record)._fields[0];
}
