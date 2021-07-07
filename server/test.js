let doc;
let Docxtemplater = require('docxtemplater');
let fs = require('fs');
let path = require('path');
let PizZip = require('pizzip');




try {
	let content = fs.readFileSync(path.resolve(__dirname, 'template.docx'), 'binary');
	let zip = new PizZip(content);
    doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
	doc.setData({
		"employees":[{name:"Peter"},{name:"Mary"}],
		reportMonth:"June 2021"
	});
	doc.render();
	let buf = doc.getZip().generate({type: 'nodebuffer'});
	fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
} catch(error) {
    // Catch compilation errors (errors caused by the compilation of the template: misplaced tags)
    console.log(error);
}
	