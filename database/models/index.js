const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
const initModels = require('./init-models'); // init-models.js에서 메서드를 가져온다.

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
  },
});

// 모델과 테이블간의 관계가 맺어진다.
const db = initModels(sequelize);

// db객체에 Sequelize 패키지 넣기
// 연결 객체를 나중에 재사용하기 위해 넣어줌
db.sequelize = sequelize;
// db객체에 Sequelize 인스턴스 넣기
db.Sequelize = Sequelize;

module.exports = db;
