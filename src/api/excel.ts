//@ts-ignore @typescript-eslint/no-unused-vars
import React from 'react';
import { pgrest_admin_client } from "../lib/pgrest";
import { pick } from "lodash"
import type { DataSourceType } from "../types"

export async function deleteExcelRow(eid: number, row_id: React.Key) {
    //let data: DataSourceType[];
    const { data, error } = await pgrest_admin_client
        .from('excel_row')
        .delete()
        .match({ 'eid': eid, 'row_id': row_id as number });
}

export async function insertExcelRow(eid: Number, json: DataSourceType, headers: string[]) {
    //let data: DataSourceType[];
    let json_content = pick(json, headers);
    const { data, error } = await pgrest_admin_client
        .from('excel_row')
        .insert({ eid: eid, row_id: json['id'] as number, json: json_content })

}


export async function upsertExcelRow(eid: Number, json: DataSourceType, headers: string[]) {
    //let data: DataSourceType[];
    let json_content = pick(json, headers);

    const { data, error } = await pgrest_admin_client
        .from('excel_row')
        .update({ json: json_content })
        .match({ eid: eid, row_id: json['id'] as number })
    //.upsert({ eid: eid, row_id: json['id'] as number, json: json }, { onConflict: '(eid, row_id)' })
}
