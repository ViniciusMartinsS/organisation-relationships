import { Connection } from 'mysql2/promise';
import { Router } from 'express';

export interface DatabaseConfiguration {
  database: string;
  host: string;
  password: string;
  user: string;
}

export interface DatabaseClass {
  initialize(): Promise<Connection>;
}

export interface SelectOrganisation {
  id: number;
}

export interface RouterClass {
  organisation(): Router;
}
