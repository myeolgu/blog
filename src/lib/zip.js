const textEncoder = new TextEncoder();

function writeUint16(view, offset, value) {
  view.setUint16(offset, value, true);
}

function writeUint32(view, offset, value) {
  view.setUint32(offset, value, true);
}

function getCrc32(bytes) {
  let crc = 0xffffffff;

  for (const byte of bytes) {
    crc ^= byte;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

export function createZip(files) {
  const localFiles = [];
  const centralFiles = [];
  let offset = 0;

  for (const file of files) {
    const name = textEncoder.encode(file.path);
    const content = textEncoder.encode(file.content);
    const crc = getCrc32(content);
    const localFile = new Uint8Array(30 + name.length + content.length);
    const localView = new DataView(localFile.buffer);

    writeUint32(localView, 0, 0x04034b50);
    writeUint16(localView, 4, 20);
    writeUint32(localView, 14, crc);
    writeUint32(localView, 18, content.length);
    writeUint32(localView, 22, content.length);
    writeUint16(localView, 26, name.length);
    localFile.set(name, 30);
    localFile.set(content, 30 + name.length);
    localFiles.push(localFile);

    const centralFile = new Uint8Array(46 + name.length);
    const centralView = new DataView(centralFile.buffer);

    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20);
    writeUint16(centralView, 6, 20);
    writeUint32(centralView, 16, crc);
    writeUint32(centralView, 20, content.length);
    writeUint32(centralView, 24, content.length);
    writeUint16(centralView, 28, name.length);
    writeUint32(centralView, 42, offset);
    centralFile.set(name, 46);
    centralFiles.push(centralFile);
    offset += localFile.length;
  }

  const centralSize = centralFiles.reduce((size, file) => size + file.length, 0);
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);

  writeUint32(endView, 0, 0x06054b50);
  writeUint16(endView, 8, files.length);
  writeUint16(endView, 10, files.length);
  writeUint32(endView, 12, centralSize);
  writeUint32(endView, 16, offset);

  return new Blob([...localFiles, ...centralFiles, endRecord], { type: "application/zip" });
}
