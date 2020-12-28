const { clipboard, nativeImage, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const { v1: uuidv1 } = require('uuid');
const config = {
  configDir: './data'
};

// 创建目录并写入文件
const writeFileDir = function(filePath, buffer, callback) {
  const lastFilePath = filePath.substring(0, filePath.lastIndexOf('/'));
  fs.mkdir(lastFilePath, { recursive: true }, err => {
    if (err) callback(err);
    fs.writeFile(filePath, buffer, err => {
      if (err) callback(err);
      return callback(null);
    });
  });
};

// 剪切板复制图片
const clipboardImg = function() {
  return new Promise((resolve, reject) => {
    const nativeImage = clipboard.readImage();
    if (nativeImage.isEmpty()) {
      return resolve(false);
    }

    const fileBuffer = Buffer.from(nativeImage.toPNG(), 'binary');
    const fileSuffix = 'png';
    const fileName = uuidv1() + '.png';

    // 图片存入临时目录
    const filePath = path
      .join(config.configDir, `/clipboard-temp/${fileName}`)
      .split(path.sep)
      .join('/');

    // 转为FileList对象
    const fileList = new File([fileBuffer], fileName, {
      type: `image/${fileSuffix}`
    });

    // 构造一个fileList对象，方便自定义其他属性
    const fileObj = {
      lastModifiedDate: fileList.lastModifiedDate,
      lastModified: fileList.lastModified,
      name: fileList.name,
      path: filePath,
      size: fileList.size,
      type: fileList.type,
      webkitRelativePath: fileList.webkitRelativePath
    };

    // 创建文件
    writeFileDir(filePath, fileBuffer, err => {
      if (err) {
        console.log('err', err);
        reject(err);
        return;
      }
      resolve([fileObj]);
    });
  });
};

// 文件夹多文件复制
const clipboardMultipleDirectoryImg = function() {
  return new Promise((resolve, reject) => {
    // 获取剪贴板中的文件列表
    const getFiles = ipcRenderer.sendSync('clipboad-multiple-get');

    // 过滤文件
    const files = getFiles.filter(file => fs.statSync(file).isFile());

    const fileArr = [];

    if (files.length) {
      try {
        files.forEach(file => {
          // 路径转换
          const reslovePath = file
            .split(path.sep)
            .join('/')
            .split('/');
          const fileName = reslovePath[reslovePath.length - 1];
          const fileBuffer = fs.readFileSync(file);
          const fileSuffix = fileName.split('.')[1];

          // / 转为FileList对象
          const imgType = ['jpg', 'jpeg', 'png', 'gif'];
          // 处理文件类型： 鉴于文件类型过多，目前只处理图片文件，其他都走 application
          const fileType = imgType.includes(fileSuffix.toLocaleLowerCase()) ? `image/${fileSuffix}` : `application/${fileSuffix}`;
          const fileList = new File([fileBuffer], fileName, {
            type: fileType
          });

          // 构造一个fileList对象，方便自定义其他属性
          const fileObj = {
            lastModifiedDate: fileList.lastModifiedDate,
            lastModified: fileList.lastModified,
            name: fileList.name,
            path: file.split(path.sep).join('/'),
            size: fileList.size,
            type: fileList.type,
            webkitRelativePath: fileList.webkitRelativePath
          };

          fileArr.push(fileObj);
        });

        resolve(fileArr);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(false);
    }
  });
};

/**
 * 获取粘贴板内容
 */
export async function getClipboardData() {
  var text = clipboard.readText();
  console.log('🚀 ~ file: clipboard.js ~ line 127 ~ getClipboardData ~ text', text);
  // let clipboardDataRes =
  // (await clipboardMultipleDirectoryImg()) || (await clipboardImg());
  const clipboardDataRes = await clipboardImg();

  return {
    files: clipboardDataRes,
    text
  };
}

/**
 * 设置剪切板内容
 * @param {*} type  类型
 * @param {*} content  内容|路径
 */
export function setClipboard(type, content) {
  if (type === 'text') {
    clipboard.writeText(content);
  }

  if (type === 'html') {
    clipboard.writeHTML(content);
  }

  if (type === 'img') {
    // content 为图片路径
    const image = nativeImage.createFromPath(content);
    clipboard.writeImage(image, 'image');
  }

  if (type === 'file') {
    // TODO: 待处理
  }
}
