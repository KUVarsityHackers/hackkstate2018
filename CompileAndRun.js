var request = require('request');

var program = {
    script : "#include<iostream>\nint main(){std::cout << \"Hello\" << std::endl;return 0;}",
    language: "cpp14",
    versionIndex: "2",
    clientId: "43540fa13cb920a980bb8011740ba63f",
    clientSecret:"463414f3fccd12261c2afcff044d17937207c1f8c1c1b60a3ee181b314c6cfda"
};
request({
    url: 'https://api.jdoodle.com/execute',
    method: "POST",
    json: program
},
function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});
