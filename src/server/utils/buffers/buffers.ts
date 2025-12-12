const fromBufferView = (props: { bufferView: ArrayBufferView }): Buffer => {
  const { bufferView } = props
  return Buffer.from(bufferView.buffer, bufferView.byteOffset, bufferView.byteLength)
}

export const Buffers = {
  fromBufferView,
}
