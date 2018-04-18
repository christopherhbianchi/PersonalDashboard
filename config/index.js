var configValues = require('./config');
//the other file doesn't have to export to us since we're in same package

module.exports = {

  getDbConnectionString: function(){
    return 'mongodb://' + configValues.uname + ':' + configValues.pword
    + '@ds141889.mlab.com:41889/nodetododb';
  }

}
