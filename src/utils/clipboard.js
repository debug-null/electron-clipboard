const { clipboard, nativeImage } = require("electron");
const fs = require("fs");
const path = require("path");
const { v1: uuidv1 } = require("uuid");
const config = require("@/config/config.js");

//创建目录并写入文件
const writeFileDir = function(filePath, buffer, callback) {
  let lastFilePath = filePath.substring(0, filePath.lastIndexOf("/"));
  fs.mkdir(lastFilePath, { recursive: true }, err => {
    if (err) callback(err);
    fs.writeFile(filePath, buffer, err => {
      if (err) callback(err);
      return callback(null);
    });
  });
};

//剪切板复制图片
const clipboardImg = function() {
  return new Promise((resolve, reject) => {
    const nativeImage = clipboard.readImage();
    if (nativeImage.isEmpty()) {
      return resolve(false);
    }
    // 剪切板中的图片文件，图片转BASE64
    // const imgBase64 =
    //   "data:image/png;base64," +
    //   Buffer.from(nativeImage.toPNG(), "binary").toString("base64");
    //   console.log("🚀 ~ file: clipboard.js ~ line 53 ~ returnnewPromise ~ imgBase64", imgBase64)

    let fileBuffer = Buffer.from(nativeImage.toPNG(), "binary");
    let fileSuffix = "png";
    let fileName = uuidv1() + ".png";
    //图片存入临时目录
    let filePath = path
      .join(config.configDir, `/clipboard-temp/${fileName}`)
      .split(path.sep)
      .join("/");
    writeFileDir(filePath, fileBuffer, err => {
      if (err) {
        console.log("err", err);
        reject(err);
        return;
      }
      resolve({
        fileName,
        filePath,
        fileBuffer,
        fileSuffix
      });
    });
  });
};

//文件夹中文件复制
const clipboardDirectoryImg = function() {
  return new Promise((resolve, reject) => {
    //  处理文件夹中的复制
    //Formats： https://www.codeproject.com/Reference/1091137/Windows-Clipboard-Formats
    let filePath = clipboard
      .readBuffer("FileNameW")
      .toString("ucs2")
      .replace(RegExp(String.fromCharCode(0), "g"), "");

    if (filePath) {
      try {
        // 路径转换
        let reslovePath = filePath
          .split(path.sep)
          .join("/")
          .split("/");
        let fileName = reslovePath[reslovePath.length - 1];
        let fileBuffer = fs.readFileSync(filePath);
        let fileSuffix = fileName.split(".")[1];
        resolve({
          fileName,
          filePath: filePath.split(path.sep).join("/"),
          fileBuffer,
          fileSuffix
        });
      } catch (err) {
        reject(err);
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
  var files = [];
  var text = clipboard.readText();

  let clipboardDataRes =
    (await clipboardDirectoryImg()) || (await clipboardImg());
  if (clipboardDataRes.fileName) {
    // 转为FileList对象
    let fileList = new File(
      [clipboardDataRes.fileBuffer],
      clipboardDataRes.fileName,
      {
        type: `image/${clipboardDataRes.fileSuffix}`
      }
    );
    // 构造一个fileList对象，方便自定义其他属性
    let fileObj = {
      lastModifiedDate: fileList.lastModifiedDate,
      lastModified: fileList.lastModified,
      name: fileList.name,
      path: clipboardDataRes.filePath,
      size: fileList.size,
      type: fileList.type,
      webkitRelativePath: fileList.webkitRelativePath
    };
    files.push(fileObj);
  }

  return {
    files,
    text
  };
}

/**
 * 设置剪切板内容
 * @param {*} type  类型
 * @param {*} content  内容|路径
 */
export function setClipboard(type, content) {
  if (type === "text") {
    clipboard.writeText(content);
  }

  if (type === "html") {
    clipboard.writeHTML(content);
  }

  if (type === "img") {
    // content 为图片路径
    const image = nativeImage.createFromPath(content);
    clipboard.writeImage(image, "image");
  }

  if (type === "file") {
    // TODO: 待处理
  }
}
