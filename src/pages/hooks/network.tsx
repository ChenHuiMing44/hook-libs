import React from 'react'
import useNetwork from '@/hooks/useNetwork'
import {format} from '@/utils/time'

const list = ['since', 'rtt', 'type', 'downlink', 'saveData', 'downlinkMax', 'effectiveType']

const Network = () => {

  const state = useNetwork()


  //online?: boolean;
  //   rtt?: number;
  //   type?: string;
  //   downlink?: number;
  //   saveData?: boolean;
  //   downlinkMax?: number;
  //   effectiveType?: string;

  return (
    <div style={{padding: '40px', fontSize: '18px'}}>
      <div>
        <span>状态：</span>
        <span style={{ color: state.online ? 'green': 'red', fontWeight: 'bold' }}>
          {state.online ? '在线': '离线'}
        </span>
      </div>
      {
        list.map((key) =>
          (<div key={key}>
            {key}:
            <span style={{fontWeight: 'bold', paddingLeft: '15px'}}>
              {key === 'since' ? format(Reflect.get(state, key)) : Reflect.get(state, key)}
            </span>
          </div>))
      }
    </div>
  )
}

export default Network
