import request from '@/utils/request'
import requestFile from '@/utils/requestFile'
export function getDailyInfo(data) { // 获取借款信息
  return request({
    url: '/repayment/pageQuery',
    method: 'post',
    data
  })
}

export function inputInfo(data) { // 导入文件
  return requestFile({
    url: '/repayment/fileUpload',
    method: 'post',
    data
  })
}
export function downInfo(data) { // 下载文件
  return request({
    url: '/repayment/fileUpload',
    method: 'post',
    data
  })
}
export function delAllData(data) { // 删除文件
  return request({
    url: '/repayment/delete',
    method: 'post',
    data
  })
}
