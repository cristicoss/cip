"use strict";
import { supabase } from "./fetch-api.js";

// Inserts one or many rows into any table.
// Usage:
//   await insertRow('table', { field1: 'value' })
//   await insertRow('table', [{ field1: 'a' }, { field1: 'b' }])
const insertSupaRow = async (tableName, rowOrRows, options = {}) => {
  try {
    if (!tableName) throw new Error("Table name is required");
    if (!rowOrRows || (Array.isArray(rowOrRows) && rowOrRows.length === 0)) {
      throw new Error("Payload (object or array) is required");
    }

    // Separate internal option `merge` from Supabase insert options
    const { merge, ...insertOptions } = options;

    // If `merge: true` and payload is an array of partials, merge into one row
    let rows;
    if (Array.isArray(rowOrRows) && merge === true) {
      const merged = Object.assign({}, ...rowOrRows);
      rows = [merged];
    } else {
      rows = Array.isArray(rowOrRows) ? rowOrRows : [rowOrRows];
    }

    const { data, error } = await supabase
      .from(tableName)
      .insert(rows, insertOptions);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Supabase insert error:", error);
    return { data: null, error };
  }
};

export { insertSupaRow };
