import React from 'react';
import axios from "axios";
import { hostname } from '../lib/config';
import type { DataSourceType } from "../types"

export async function deleteRecord(surveyName: string, rid: React.Key) {
    let ridName = `${surveyName}-rid`
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }
    headers[ridName] = rid as string;
    let result = await axios.delete(`${hostname()}/sr/${surveyName}`, {
        headers,
        withCredentials: true
    })
    console.log(result)
}

export async function saveRecord(surveyName: string, data: DataSourceType) {
    let ridName = `${surveyName}-rid`
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }
    headers[ridName] = data['id'] as string;
    let result = await axios.post(`${hostname()}/go/st/${surveyName}`, data, {
        headers,
        withCredentials: true
    })
    console.log(result)
}