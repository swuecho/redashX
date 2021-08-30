import { PostgrestClient } from '@supabase/postgrest-js'

import { admin_api_host, survey_api_host } from "./config"

// if use directly
// might have problem that jwt is not issued 
// so wrap in a function call
export const pgrest_admin_client =  new PostgrestClient(admin_api_host())
export const pgrest_survey_client = new PostgrestClient(survey_api_host())