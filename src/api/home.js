import request from '../utils/httpRequest'

export function getPanelData(){
  return request({
    url: `/proxyApi/data/panel-data`,
    method: 'get'
  })
}
