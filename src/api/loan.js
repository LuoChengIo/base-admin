import request from '@/utils/request'
import requestFile from '@/utils/requestFile'
export function getDailyInfo(data) { // 获取放款信息
  return request({
    url: '/reportLoanInfo/findList',
    method: 'post',
    data
  })
}

export function inputInfo(data) { // 导入文件
  return requestFile({
    url: '/reportLoanInfo/import',
    method: 'post',
    data
  })
}
export function downInfo(data) { // 下载文件
  return request({
    url: '/reportLoanInfo/downTemplate',
    method: 'post',
    data
  })
}
export function delAllData(data) { // 删除文件
  return request({
    url: '/reportLoanInfo/deleteDatas',
    method: 'post',
    data
  })
}
