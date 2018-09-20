import request from '@/utils/request'
import requestFile from '@/utils/requestFile'
export function getDailyInfo(data) { // 获取每日统计
  return request({
    url: '/dailyInfo/list',
    method: 'post',
    data
  })
}

export function inputInfo(data) { // 导入文件
  return requestFile({
    url: '/dailyInfo/import',
    method: 'post',
    data
  })
}
export function downInfo(data) { // 下载文件
  return request({
    url: '/dailyInfo/downloadTemplate',
    method: 'post',
    data
  })
}
export function delAllData(data) { // 删除文件
  return request({
    url: '/dailyInfo/clean',
    method: 'post',
    data
  })
}
