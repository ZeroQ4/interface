import { createSlice } from '@reduxjs/toolkit'
import { SupportedChainId } from 'constants/chains'

export enum ConnectionType {
  APTOSLAB,
}

const connectionURLMap = {
  [ConnectionType.APTOSLAB]: {
    // [SupportedChainId.APTOS]: `https://fullnode.mainnet.aptoslabs.com`,
    [SupportedChainId.APTOS]: `https://aptos-mainnet.nodereal.io/v1/0b8627f45c4544efaa2b71672a21d1c7`,
    [SupportedChainId.APTOS_TESTNET]: `https://testnet.aptoslabs.com`,
    // [SupportedChainId.APTOS_TESTNET]: `https://aptos-testnet.nodereal.io/v1/7ca94432049e401aa362258b5083d1ef`,
    [SupportedChainId.APTOS_DEVNET]: `https://fullnode.devnet.aptoslabs.com`,
  },
}

export function getRPCURL(connection: ConnectionType, chainId: SupportedChainId) {
  const maps = connectionURLMap[connection]
  if (!maps) {
    return undefined
  }
  return connectionURLMap[connection][chainId]
}

export interface ConnectionState {
  currentConnection: ConnectionType
  error: { [chainId: number]: string | undefined }
}

export const initialState: ConnectionState = {
  currentConnection: ConnectionType.APTOSLAB,
  error: {
    [SupportedChainId.APTOS]: undefined,
    [SupportedChainId.APTOS_TESTNET]: undefined,
    [SupportedChainId.APTOS_DEVNET]: undefined,
  },
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    updateConnectionError(state, { payload }: { payload: { chainId: SupportedChainId; error: string | undefined } }) {
      state.error[payload.chainId] = payload.error
    },
  },
})

export const { updateConnectionError } = connectionSlice.actions
export default connectionSlice.reducer
