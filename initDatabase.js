const { excuteSqlScript } = require('./config/db');


const excuteScript = async () => {
  try {
    const scriptPath = './schema.sql';

    await excuteSqlScript(scriptPath);
  } catch (err) {
    console.log('Error excuting SQL script:', err);
  }
}

excuteScript();