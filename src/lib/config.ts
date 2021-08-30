import urlcat from 'urlcat';
import axios, { AxiosPromise } from 'axios'
import _ from 'lodash'

export enum COLOR {
  Red = '#F56C6C',
  Yellow = '#F1E05A',
  Blue = '#409EFF',
  Green = '#1d953f'
}


export function hostname(): string {
  let hostname = [window.location.protocol, '//', window.location.host].join('')
  return hostname
}



export const GEOIP_URI = `${hostname()}/go/geoip`

export function admin_api_host(): string {
  return `${hostname()}/api/admin`
}

export function survey_api_host(): string {
  return urlcat(hostname(), '/api/sr')
}

export function survey_render_host(): string {
  return `${hostname()}/sr`
}

export function get_axios_header(): Object {
  return {
    headers: {
    }
  }
}

export function axios_admin_get(uri: string) {
  var config = {
    baseURL: admin_api_host(),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios.create(config).get(uri)
}

export function axios_admin_delete(uri: string): Promise<AxiosPromise<any>> {
  var config = {
    baseURL: admin_api_host(),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios.create(config).delete(uri)
}
// todo restrict record k string to Http headers
export function axios_admin_post(uri: string, data: any, headers: Record<string, string> = {}) {
  var config = {
    baseURL: admin_api_host(),
    headers: _.merge(headers, {
      'Content-Type': 'application/json'
    })
  }

  return axios.create(config).post(uri, data)
}

export function axios_admin_patch(uri: string, data: any) {
  var config = {
    baseURL: admin_api_host(),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios.create(config).patch(uri, data)
}

export function axios_survey_get(uri: string) {
  var config = {
    baseURL: survey_api_host(),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return axios.create(config).get(uri)
}

export function get_user_id(): string {
  let user_id = localStorage['user_id']
  if (user_id) {
    return user_id
  } else {
    // TODO: error in ts
    throw Error('not user_id token in localStorage')
  }
}
