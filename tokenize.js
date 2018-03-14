function fileread(filename){
    contents = fs.readFileSync(filename);
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
jsTokens = require("js-tokens").default
stringify = require('csv-stringify');

file_names = []
// samples/
fs.readdirSync('cdm_js/REQ11197-1441017585').forEach(file => {
    file_names.push(file);
})

filtered_tokens = [];
console.log(file_names)
for (var i = 0; i < file_names.length; i++) {
  data = fileread('cdm_js/REQ11197-1441017585/' + file_names[i]);
  tokens = data.toString().match(jsTokens)
  refined_tokens = tokens.filter(function(token) { 
    return token.length > 2 && !keywords.includes(token);
  });
  filtered_tokens.push.apply(filtered_tokens, refined_tokens)
}

filtered_tokens = filtered_tokens.filter(n => n.trim());
var counts = {};

for (var i = 0; i < filtered_tokens.length; i++) {
	var token = filtered_tokens[i];
	counts[token] = counts[token] ? counts[token] + 1 : 1;
}

rows = []
for(i = 0; i < Object.keys(counts).length; i++) {
    rows.push([Object.keys(counts)[i], counts[Object.keys(counts)[i]].toString()])
}

let csvObj = {
    'rows': rows
}

stringify(csvObj.rows, function(error, output){
    fs.writeFile('test.csv', output, function(err) {
	    if(err) {
		    return console.log(err);
	    }
	    console.log('The file was saved!');
    });
});