module.exports = {
  dialect: 'postgres',
  host: process.env.DOCKER || 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  port: 5433,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
