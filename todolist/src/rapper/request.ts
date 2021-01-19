/* md5: 0ce4013e31e7734203c0d215dc37fb3e */
/* Rap仓库id: 275890 */
/* Rapper版本: 1.1.6-beta.0 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=275890
 */

import * as commonLib from 'rap/runtime/commonLib'
import * as reduxLib from 'rap/runtime/reduxLib'
import {RequestTypes} from './redux'

export interface IModels {
  /**
   * 接口名：获取todo列表
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=275890&mod=436237&itf=1857639
   */
  'GET/todo/list': {
    Req: {}
    Res: {
      isOK: number
      errMsg: string
      data: {
        /**
         * 属性ID
         */
        id: number
        /**
         * TODO的名称
         */
        name: string
      }[]
    }
  }

  /**
   * 接口名：删除TODO
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=275890&mod=436237&itf=1857647
   */
  'DELETE/todo': {
    Req: {
      id?: number
    }
    Res: {
      isOK: number
      errMsg: string
    }
  }

  /**
   * 接口名：添加TODO
   * Rap 地址: http://rap2.taobao.org/repository/editor?id=275890&mod=436237&itf=1857651
   */
  'PUT/todo': {
    Req: {
      name: string
    }
    Res: {
      isOK: number
      errMsg: string
    }
  }
}

type ResSelector<T> = T

export interface IResponseTypes {
  'GET/todo/list': ResSelector<IModels['GET/todo/list']['Res']>
  'DELETE/todo': ResSelector<IModels['DELETE/todo']['Res']>
  'PUT/todo': ResSelector<IModels['PUT/todo']['Res']>
}

export function createFetch(fetchConfig: commonLib.RequesterOption, extraConfig?: {fetchType?: commonLib.FetchType}) {
  if (!extraConfig || !extraConfig.fetchType) {
    console.warn(
      'Rapper Warning: createFetch API will be deprecated, if you want to customize fetch, please use overrideFetch instead, since new API guarantees better type consistency during frontend lifespan. See detail https://www.yuque.com/rap/rapper/overridefetch'
    )
  }
  const rapperFetch = commonLib.getRapperRequest(fetchConfig)
  const sendRapperFetch = (modelName: keyof typeof RequestTypes, requestParams: commonLib.IUserFetchParams) => {
    const {extra} = requestParams
    if (extra && extra.type === 'normal') {
      return rapperFetch(requestParams)
    } else {
      const action = {
        type: '$$RAPPER_REQUEST',
        payload: {...requestParams, modelName, types: RequestTypes[modelName]},
      }
      return reduxLib.dispatchAction(action, rapperFetch)
    }
  }

  return {
    /**
     * 接口名：获取todo列表
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=275890&mod=436237&itf=1857639
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'GET/todo/list': (req?: IModels['GET/todo/list']['Req'], extra?: commonLib.IExtra) => {
      return sendRapperFetch('GET/todo/list', {
        url: '/todo/list',
        method: 'GET',
        params: req,
        extra,
      }) as Promise<IResponseTypes['GET/todo/list']>
    },

    /**
     * 接口名：删除TODO
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=275890&mod=436237&itf=1857647
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'DELETE/todo': (req?: IModels['DELETE/todo']['Req'], extra?: commonLib.IExtra) => {
      return sendRapperFetch('DELETE/todo', {
        url: '/todo',
        method: 'DELETE',
        params: req,
        extra,
      }) as Promise<IResponseTypes['DELETE/todo']>
    },

    /**
     * 接口名：添加TODO
     * Rap 地址: http://rap2.taobao.org/repository/editor?id=275890&mod=436237&itf=1857651
     * @param req 请求参数
     * @param extra 请求配置项
     */
    'PUT/todo': (req?: IModels['PUT/todo']['Req'], extra?: commonLib.IExtra) => {
      return sendRapperFetch('PUT/todo', {
        url: '/todo',
        method: 'PUT',
        params: req,
        extra,
      }) as Promise<IResponseTypes['PUT/todo']>
    },
  }
}
