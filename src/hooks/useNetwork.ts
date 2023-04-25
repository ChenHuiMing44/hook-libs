import {isObj} from '@/utils/obj'
import {useEffect, useState} from 'react'

export interface NetworkState {
  since?: Date;
  online?: boolean;
  rtt?: number;
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change',
}

const getConnection = () => {
  const nav = navigator as any
  if(!isObj(nav)) {
    return null
  }
  return nav.connection || nav.mozConnection || nav.webkitConnection
}

function getConnectionProperty(): NetworkState {
  const c = getConnection()
  if (!c) return {}
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  }
}

export default function useNetwork() {
  const [state, setState] = useState(() => {
    return {
      since: Date.now(),
      online: navigator?.onLine,
      ...getConnectionProperty()
    }
  })

  useEffect(() => {
    const online = () => {
      setState((pre) => {
        return { ...pre, since: Date.now(), online: true}
      })
    }

    const offline = () => {
      setState((pre) => {
        return { ...pre, since: Date.now(), online: false }
      })
    }

    const changeConnection = () => {
      setState((pre) => {
        return { ...pre, ...getConnectionProperty()}
      })
    }

    window.addEventListener(NetworkEventType.ONLINE, online)
    window.addEventListener(NetworkEventType.OFFLINE, offline)
    const connection = getConnection()
    connection?.addEventListener(NetworkEventType.CHANGE, changeConnection)

    return () => {
      window.removeEventListener(NetworkEventType.OFFLINE, offline)
      window.removeEventListener(NetworkEventType.ONLINE, online)
      connection?.removeEventListener(NetworkEventType.CHANGE, changeConnection)
    }

  }, [])

  return state
}
