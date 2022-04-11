var express = require('express');
var router = express.Router();
const pool = require('../models');
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

/* GET home page. */
router.get('/',  async function(req, res, next) {
  try {
    const connection = await pool;
    const branchStore = await connection.query(`SELECT MRHST_SEQ, MRHST_NM, CAST(AES_DECRYPT(UNHEX(ADRES), '${process.env.TINFO_BRANCH_STORE}') AS CHAR) ADRES FROM ovsdb.tinfo_branch_store`);

    await res.render('index', {title: 'address to coordinates', item: branchStore[0], keyword: branchStore[0][7].ADRES});
  } catch (error) {
    console.log('error : '+error);
  }
});

router.post('/insertCoord',  async function(req, res, next) {
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var seq = req.body.seq;
  const connection = await pool;
  if (longitude && latitude && seq) {
    await connection.query(`UPDATE ovsdb.tinfo_branch_store SET LONGITUDE = ${longitude}, LATITUDE = ${latitude} WHERE MRHST_SEQ=${seq}`);
    res.send("success "+seq);
  }
  else {
    res.send("fail "+seq);
  }
});

module.exports = router;
