"use server";

import fs from "fs";
import path from "path";

const DB_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_FILES: { [key: string]: string } = {
  directors: path.join(DB_DIR, "directors.json"),
  director_sections: path.join(DB_DIR, "director_sections.json"),
  director_section_content: path.join(DB_DIR, "director_section_content.json"),
  management: path.join(DB_DIR, "management.json"),
  management_sections: path.join(DB_DIR, "management_sections.json"),
  management_section_content: path.join(DB_DIR, "management_section_content.json"),
  announcements: path.join(DB_DIR, "announcements.json"),
  announcement_sections: path.join(DB_DIR, "announcement_sections.json"),
  announcement_section_content: path.join(DB_DIR, "announcement_section_content.json"),
  blogs: path.join(DB_DIR, "blogs.json"),
  blog_sections: path.join(DB_DIR, "blog_sections.json"),
  blog_section_content: path.join(DB_DIR, "blog_section_content.json"),
  events: path.join(DB_DIR, "events.json"),
  event_sections: path.join(DB_DIR, "event_sections.json"),
  event_section_content: path.join(DB_DIR, "event_section_content.json"),
  jobs: path.join(DB_DIR, "jobs.json"),
  page_descriptions: path.join(DB_DIR, "page_descriptions.json"),
  achievements: path.join(DB_DIR, "achievements.json"),
  awards: path.join(DB_DIR, "awards.json"),
  certificates: path.join(DB_DIR, "certificates.json"),
  partners: path.join(DB_DIR, "partners.json"),
};

function readData(table: string): any[] {
  const file = DB_FILES[table];
  if (!file) return [];
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
    return [];
  }
  try {
    const data = fs.readFileSync(file, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeData(table: string, data: any[]): void {
  const file = DB_FILES[table];
  if (!file) return;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

let idCounters: { [key: string]: number } = {};

function getNextId(table: string): number {
  if (!idCounters[table]) {
    const data = readData(table);
    idCounters[table] = data.length > 0 ? Math.max(...data.map((item: any) => item.id || 0)) + 1 : 1;
  }
  return idCounters[table]++;
}

export async function getDb() {
  return createQueryInterface();
}

export async function getRoDb() {
  return getDb();
}

function createQueryInterface() {
  return {
    request() {
      const inputs: { [key: string]: any } = {};
      return {
        input(name: string, value: any) {
          inputs[name] = value;
          return this;
        },
        async query(sql: string) {
          const recordset: any[] = [];
          
          // Handle SELECT queries
          if (sql.toUpperCase().startsWith("SELECT")) {
            const tableMatch = sql.match(/FROM\s+(\w+)/i);
            if (tableMatch) {
              const tableName = tableMatch[1];
              let data = readData(tableName);
              
              // Handle WHERE clauses (simple)
              const whereMatch = sql.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+GROUP|\s*$)/i);
              if (whereMatch) {
                const whereClause = whereMatch[1];
                // Simple WHERE @id = @id
                const idMatch = whereClause.match(/(\w+)\s*=\s*@(\w+)/i);
                if (idMatch) {
                  const field = idMatch[1];
                  const paramName = idMatch[2];
                  const paramValue = inputs[paramName];
                  data = data.filter((item: any) => item[field] == paramValue);
                }
              }
              
              // Handle ORDER BY
              const orderMatch = sql.match(/ORDER\s+BY\s+(\w+)\s+(ASC|DESC)/i);
              if (orderMatch) {
                const orderField = orderMatch[1];
                const orderDir = orderMatch[2].toUpperCase();
                data.sort((a: any, b: any) => {
                  if (orderDir === "ASC") {
                    return a[orderField] > b[orderField] ? 1 : -1;
                  } else {
                    return a[orderField] < b[orderField] ? 1 : -1;
                  }
                });
              }
              
              // Handle simple SELECT * or specific columns
              recordset.push(...data);
            }
          }
          
          // Handle INSERT queries
          if (sql.toUpperCase().startsWith("INSERT")) {
            const insertMatch = sql.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
            if (insertMatch) {
              const tableName = insertMatch[1];
              const columns = insertMatch[2].split(",").map((c: string) => c.trim().replace(/@/g, ""));
              const valuesPart = insertMatch[3];
              
              // Extract values (handling @param placeholders)
              const newRecord: any = { id: getNextId(tableName) };
              
              // Simple parsing - just assign based on inputs
              for (const [name, value] of Object.entries(inputs)) {
                if (columns.includes(name)) {
                  newRecord[name] = value;
                }
              }
              
              const data = readData(tableName);
              data.push(newRecord);
              writeData(tableName, data);
              
              recordset.push({ id: newRecord.id });
            }
          }
          
          // Handle DELETE queries
          if (sql.toUpperCase().startsWith("DELETE")) {
            const deleteMatch = sql.match(/DELETE\s+FROM\s+(\w+)\s+WHERE\s+(\w+)\s*=\s*@(\w+)/i);
            if (deleteMatch) {
              const tableName = deleteMatch[1];
              const field = deleteMatch[2];
              const paramName = deleteMatch[3];
              const paramValue = inputs[paramName];
              
              let data = readData(tableName);
              data = data.filter((item: any) => item[field] != paramValue);
              writeData(tableName, data);
            }
          }
          
          return { recordset };
        },
      };
    },
  };
}