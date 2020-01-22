module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin:123@localhost/noteful',
};
// dbname=d4us1m7r3e8tcp host=ec2-34-193-42-173.compute-1.amazonaws.com port=5432 user=vttnrizsydnlfe password=5bfd4884b3d046e35a53f4c82b827d0cf3a246a59b28bcccf5c329e35d4629fb sslmode=require
