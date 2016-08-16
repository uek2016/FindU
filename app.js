var express = require('express');
var pinyin = require('pinyin');
var mysql = require('mysql');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var moment = require('moment');



var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/static/'));
app.use(cookieParser());

///////////////////////// 路由 ///////////////////////////////////
app.get('/app/login', function(req, res) {
	res.sendFile(__dirname + '/front/m_login.html');
});
app.get('/app/reset', function(req, res) {
	res.sendFile(__dirname + '/front/m_reset.html');
});
app.get('/index.manifest', function(req, res) {
	res.sendFile(__dirname + '/front/index.manifest');
});
app.get('/app/extra', function(req, res) {
	res.sendFile(__dirname + '/front/lxr_extra_work.html');
});
app.get('/app/copyright', function(req, res) {
	res.sendFile(__dirname + '/front/slide.html');
});
app.get('/app/jiabanshow', function(req, res) {
	res.sendFile(__dirname + '/front/jiaban_show.html');
});
app.get('/app/', function(req, res) {
	// if(req.cookies.__uek__){
	res.sendFile(__dirname + '/front/m_index.html');
	// }else{
	// res.redirect('/app/login');
	// }
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/admin/login.html');
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/admin/login.html');
});
app.get('/extra', function(req, res) {
	res.sendFile(__dirname + '/admin/extra_work.html');
});
app.get('/', function(req, res) {
	var account = req.cookies.__uek__;
	var columns = ['authority'];
	connection.query('SELECT ?? from user where phone = ?', [columns, account], function(err, rows, fields) {
		if(err) throw err;
		if(rows[0] && rows[0].authority === 1) {
			res.sendFile(__dirname + '/admin/index.html');
		} else {
			res.redirect('/login');
		}
	});
});

////////////////////API列表////////////////////////////////////

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'uek',
	// socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
});

app.get('/checkUser', function(req, res) {

	var hash = crypto.createHash("md5");
	hash.update(new Buffer(req.query.password, "binary"));
	var encode = hash.digest('hex');

	connection.query('SELECT ?? FROM user where phone = ?', ['password', req.query.account], function(err, result) {
		if(result[0] && (result[0].password === encode)) {
			res.jsonp({
				phone: req.query.account,
				password: result[0].password,
				uid: result[0].uid,
			});
		} else {
			res.jsonp(false);
		}
	});
});

app.get('/resetPasswordByAccount', function(req, res) {

	var hash = crypto.createHash("md5");
	hash.update(new Buffer("123456", "binary"));
	var password = hash.digest('hex');

	connection.query('UPDATE user SET password = ?  WHERE phone = ?', [password, req.query.account], function(err, result) {
		if(err) {
			res.jsonp(false);
		} else {
			res.jsonp(true);
		}
	});
});

app.get('/setPassword', function(req, res) {
	var hash = crypto.createHash("md5");
	hash.update(new Buffer(req.query.password, "binary"));
	var password = hash.digest('hex');
	connection.query('UPDATE user SET password = ?  WHERE phone = ?', [password, req.query.account], function(err, result) {
		if(err) {
			res.jsonp(false);
		} else {
			res.jsonp(true);
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

app.get('/addUser', function(req, res) {
	var date = new Date();

	var hash = crypto.createHash("md5");
	hash.update(new Buffer("123456", "binary"));
	var encode = hash.digest('hex');

	connection.query('INSERT INTO user SET ?', {
		ctime: date.getTime(),
		mtime: date.getTime(),
		is_del: 0,
		password: encode,
	}, function(err, result) {
		if(err) throw err;
		res.json(result.insertId);
	});
});

app.get('/deleteUserById', function(req, res) {
	connection.query('DELETE FROM user WHERE uid = ?', [req.query.uid], function(err, result) {
		if(err) {
			res.json(false);
		} else {
			res.json(true);
		}
	});
});

app.get('/updateUserById', function(req, res) {
	var q = req.query;

	var r = pinyin(q.uname, {
		style: pinyin.STYLE_NORMAL,
		heteronym: true
	});

	var account = r.map(function(v) {
		return v[0];
	}).join('');
	var sindex = account[0];

	connection.query('UPDATE user SET uname = ?, phone = ?, tel = ?, account = ?, sindex = ?  WHERE uid = ?', [q.uname.trim(), q.phone.trim(), q.tel.trim(), account, sindex, q.uid], function(err, results) {
		if(err) {
			res.json(false);
		} else {
			res.json(true);
		}
	});
});

app.get('/getAllUser', function(req, res) {
	var columns = ['account', 'uname', 'phone', 'tel', 'uid', 'sindex'];
	connection.query('SELECT ?? from user', [columns], function(err, rows, fields) {
		if(err) throw err;
		res.jsonp(rows);
	});
});

app.get('/getUserById', function(req, res) {
	var uid = req.query.uid;
	var columns = ['uname', 'phone', 'tel', 'uid', 'sindex'];
	connection.query('SELECT ?? from user where uid = ?', [columns, uid], function(err, rows, fields) {
		if(err) throw err;
		res.jsonp(rows[0]);
	});
});

app.get('/getAuthById', function(req, res) {
	var uid = req.query.uid;
	var columns = ['authority'];
	connection.query('SELECT ?? from user where uid = ?', [columns, uid], function(err, rows, fields) {
		if(err) throw err;
		res.jsonp(rows[0].authority);
	});

});

///// 返回wid
app.get('/api/exwork/addexwork', function(req, res) {
	var date = new Date();
	connection.query('INSERT INTO uek_extra_work SET ?', {
		ctime: date.getTime(),
		mtime: date.getTime(),
		is_del: 0,
	}, function(err, result) {
		if(err) throw err;
		res.json(result.insertId);
	});
})

//// 根据uid获取所有条目
app.get('/api/exwork/getAllworkByUid', function(req, res) {
	var uid = req.query.uid;
	connection.query('SELECT * from uek_extra_work where uid = ?', [uid], function(err, rows, fields) {
		if(err) throw err;
		res.json(rows);
	});
})


//// 根据wid更新加班条目
app.get('/api/exwork/updateWorkByUid', function(req, res) {
	var q = req.query;
	connection.query('UPDATE uek_extra_work SET uid = ?, w_title = ?, w_keywords = ?, w_progress = ?, w_start_time = ?,  w_end_time = ?, w_date = ? WHERE wid = ? ', 
	[q.uid, q.w_title, q.w_keywords, q.w_progress, q.w_start_time, q.w_end_time, q.w_date, q.wid], function(err, results) {
		if(err) {
			res.json(false);
		} else {
			res.json(true);
		}
	});
})

///// 根据wid删除加班条目
app.get('/api/exwork/deleteWorkByWid', function(req, res) {
	connection.query('UPDATE uek_extra_work SET is_del = 1 WHERE wid = ? ', [req.query.wid], function(err, results) {
		if(err) {
			res.json(false);
		} else {
			res.json(true);
		}
	});
})
//// 根据wid获取一条加班记录 
app.get('/api/exwork/getworkbywid',function(req,res){
	connection.query('select * from uek_extra_work where wid = ?',
	[req.query.wid],
	function(err,result){
		if(err) throw err;
		res.json(result)
	});
})
////////获取所有的加班条目  后台使用

app.get('/api/exwork/getMonthWork', function(req, res) {
	
	var datestring = moment().year() + '-' + req.query.m + '-' + '1';
	var date = moment(datestring,'YYYY-MM-DD');
	var start = date.valueOf();
	var end = date.clone().add(date.daysInMonth()-1,'day').valueOf();
	
	var columns = ['wid', 'user.uid', 'uname', 'w_title', 'w_keywords', 'w_progress', 'w_start_time', 'w_end_time', 'w_date', 'uek_extra_work.is_del'];
	connection.query('SELECT ?? FROM uek_extra_work LEFT JOIN user ON uek_extra_work.uid = user.uid WHERE w_date BETWEEN ? AND ?', [columns,start,end],
		function(err, rows) {
			if(err) throw err;
			res.json(rows);
		})
});
/////////把所有的work条目导出为excel表格

var nodeExcel = require('excel-export');

app.get('/api/exwork/excel', function(req, res) {
	//检索数据  获取所有用户一段时间内的所有加班记录
	var datestring = moment().year() + '-' + req.query.m + '-' + '1';
	var date = moment(datestring,'YYYY-MM-DD');
	var start = date.valueOf();
	var end = date.clone().add(date.daysInMonth()-1,'day').valueOf();
	
	var columns = ['wid', 'user.uid', 'uname', 'w_title', 'w_keywords', 'w_progress', 'w_start_time', 'w_end_time', 'w_date', 'uek_extra_work.is_del'];
	connection.query('SELECT ?? FROM uek_extra_work LEFT JOIN user ON uek_extra_work.uid = user.uid WHERE w_date BETWEEN ? AND ?', 
	[columns,start,end],
		function(err, rows) {
			if(err) throw err;
			var conf = {};
			conf.stylesXmlFile = __dirname + '/styles.xml';
			conf.cols = [{
				caption: '日期/姓名',
				type: 'string',
			}];
			conf.rows = [];
			//表格中的行  即所有人的姓名
			var names = _.uniq(rows.map(function(v) {
				return v.uname;
			}));
			names.forEach(function(v) {
				conf.cols.push({
					caption: v,
					type: 'sting'
				});
			});

			//表格中的列  即这个月从1日到最后一天
			var date = moment('2016-7-1', 'YYYY-MM-DD');
			var dates = _.range(date.daysInMonth()).map(function(v) {
				var day = date.clone().add(v, 'day');
				return {
					display: day.format('YY/MM/DD'),
					value: day.valueOf()
				};
			})

			//每一列中的信息
			dates.forEach(function(date) {
					//第一个为当前日期
					var row = [date.display];
					//随后为该人在该天的加班记录
					names.forEach(function(name) {

						var record = _.filter(rows, function(_) {
							return _.w_date === date.value && _.uname === name;
						})
						if(record.length) {
							//todo  补上开始时间和结束时间
							row.push(record[0].w_title);
						} else {
							row.push('');
						}
					});
					conf.rows.push(row);
				})
				//////////////////////////////////////
			var result = nodeExcel.execute(conf);
			res.setHeader('Content-Type', 'application/vnd.openxmlformats');
			res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
			res.end(result, 'binary');
		})
});