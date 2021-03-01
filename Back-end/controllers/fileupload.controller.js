/* eslint-disable consistent-return */
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { errorHandle, successHandle } = require('../helpers/index');
const FileUpload = require('../models/FileUpload');
const Jimp = require('jimp');
const config = require('../configs/app');

const methods = {
  onUpload(req, res) {
    try {
      const uuid = uuidv4().replace(/-/g, '');
      if (!req.files || Object.keys(req.files).length === 0) {
        res.error(errorHandle('No files were uploaded.', 404));
      }
      const { file } = req.files;
      const uploadPath = `public/${uuid}-${file.name}`;
      const type = file.mimetype.split('/')[1];
      if (type !== 'jpeg' && type !== 'png' && type !== 'jpg') return res.error(errorHandle('Support only jpg png jpeg', 400));
      // eslint-disable-next-line func-names
      file.mv(uploadPath, async function (err) {
        if (err) {
          return res.error(errorHandle(err));
        }
        try {
          const obj = new FileUpload({
            // data: file.data,
            size: file.size,
            encoding: file.encoding,
            md5: file.md5,
            name: file.name,
            mimetype: file.mimetype,
            fileId: uuid,
            upload_path: `${uuid}-${file.name}`,
          });
          Jimp.read(`${config.base_url}/static/${obj.upload_path}`, async (err, lenna) => {
            if (lenna.bitmap.width >= 300 && lenna.bitmap.height >= 300) {
              await obj.save();
              res.send(successHandle({ _id: obj._id }));
            } else {
              fs.unlink(`public/${obj.upload_path}`, (err) => {
                if (err) res.error(errorHandle('File not found', 404));
                res.error(errorHandle('Support Minimum 300x300 pixel with Square resolution', 400));
              });
            }
            if (err) res.error(errorHandle(err.message, 400));
          });
          // eslint-disable-next-line no-underscore-dangle
        } catch (error) {
          res.error(errorHandle(error.message, 400));
        }
      });
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
  async onDelete(req, res) {
    const { id } = req.params;
    try {
      const obj = await FileUpload.findById(id);
      if (!obj) res.error(errorHandle('File not found', 404));
      await FileUpload.findByIdAndDelete(id, (err, docs) => {
        console.log(docs);
      });
      fs.unlink(`public/${obj.upload_path}`, (err) => {
        if (err) res.error(errorHandle('File not found', 404));
        res.success(successHandle(null, 'Delete successfully'));
      });
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },

  async onGetFile(req, res) {
    const { id } = req.params;
    try {
      const obj = await FileUpload.findById({ _id: id });
      // const encoded = obj.data.toString('base64')
      if (obj) {
        res.redirect(`/static/${obj.upload_path}`);
        // const encoded = Buffer.from(obj.data, 'base64');
        // res.writeHead(200, {
        //     'Content-Type': obj.mimetype,
        // });
        // res.end(encoded);
      } else {
        res.error(errorHandle('Image not found', 404));
      }
    } catch (error) {
      res.error(errorHandle(error.message));
    }
  },
};

module.exports = { ...methods };
