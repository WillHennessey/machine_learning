function fileread(filename){
    contents= fs.readFileSync(filename);
    return contents;
}
keywords = ['do', 'if', 'in', 'for', 'new', 'try', 'var', 'case', 'else', 'enum', 'null', 'this', 'true', 'void', 'with', 'break', 'catch', 
            'class', 'const', 'false', 'super', 'throw', 'while', 'delete', 'export', 'import', 'return', 'switch', 'typeof', 'default', 'extends', 
            'finally', 'continue', 'debugger', 'function', 'do', 'if', 'in', 'for', 'int', 'new', 'try', 'var', 'byte', 'case', 'char', 'else', 'enum', 
            'goto', 'long', 'null', 'this', 'true', 'void', 'with', 'break', 'catch', 'class', 'const', 'false', 'final', 'float', 'short', 'super', 
            'throw', 'while', 'delete', 'double', 'export', 'import', 'native', 'public', 'return', 'static', 'switch', 'throws', 'typeof', 'boolean', 'default', 'extends', 
            'finally', 'package', 'private', 'abstract', 'continue', 'debugger', 'function', 'volatile', 'interface', 'protected', 'transient', 'implements', 'instanceof', 
            'synchronized', 'do', 'if', 'in', 'for', 'let', 'new', 'try', 'var', 'case', 'else', 'enum', 'eval', 'null', 'this', 'true', 'void', 'with', 'break', 'catch', 
            'class', 'const', 'false', 'super', 'throw', 'while', 'yield', 'delete', 'export', 'import', 'public', 'return', 'static', 'switch', 'typeof', 'default', 'extends', 
            'finally', 'package', 'private', 'continue', 'debugger', 'function', 'arguments', 'interface', 'protected', 'implements', 'instanceof', 'do', 'if', 'in', 'for', 'let', 
            'new', 'try', 'var', 'case', 'else', 'enum', 'eval', 'null', 'this', 'true', 'void', 'with', 'await', 'break', 'catch', 'class', 'const', 'false', 'super', 'throw', 
            'while', 'yield', 'delete', 'export', 'import', 'public', 'return', 'static', 'switch', 'typeof', 'default', 'extends', 'finally', 'package', 'private', 'continue', 
            'debugger', 'function', 'arguments', 'interface', 'protected', 'implements', 'instanceof'];
fs = require('fs');  // file system
var stringify = require('csv-stringify');
data = fileread("00BAD3437C94E65766C9D944751CA034.js");

file_names = []
fs.readdirSync('cdm_js/REQ11197-1441017585').forEach(file => {
    file_names.push(file);
})

console.log(file_names)

jsTokens = require("js-tokens").default
tokens = data.toString().match(jsTokens)
filtered_tokens = tokens.filter(function(token) { 
  return token.length > 2 && !keywords.includes(token);
});
filtered_tokens = filtered_tokens.filter(n => n.trim());
var counts = {};
for (var i = 0; i < filtered_tokens.length; i++) {
	var token = filtered_tokens[i];
	counts[token] = counts[token] ? counts[token] + 1 :1;
}

let csvObj = {
	'rows': [Object.keys(counts), Object.keys(counts).map((k) => counts[k].toString())]
}

stringify(csvObj.rows, function(error, output){
    fs.writeFile('test.csv', output, function(err) {
	    if(err) {
		    return console.log(err);
	    }
	    console.log('The file was saved!');
    });
});