var express = require('express')
var ejs = require('ejs')
var app = express()
app.engine('html',ejs.renderFile)
app.listen(2000)

app.get('/',showHome)

function showHome(req,res) {
    res.render('index.html')
}   //วิธีสร้างแบบนี้เรียก Callback Function

/*
app.get('/',function (req,res) {
    res.render('index.html')
})
*/      //วิธีสร้างแบบนี้เรียกว่า Anonymous Function

/*
app.get('/', (req,res) => res.render('index.html'))
*/      //วิธีสร้างแบบนี้เรียกว่า Arrow Function

app.get('/start',(req,res) => res.render('start.html'))

app.get('/result', (req,res) => {
    var p = req.query.price
    if (p>= 100) {p=0.95*p}
    res.send('Total is '+p)
})

var body = require('body-parser').urlencoded({extended:true})

app.get('/pay',(req,res) => res.render('pay.html'))

app.post('/pay',body, (req,res) => {
    /*
    var data= ''
    req.on('data',(chunk) => data=data+chunk)
    req.on('end', () => {
        console.log(data)
        res.redirect('/pay')
    })
    */
    console.log(req.body.card)
    res.redirect('/pay')
})

//สร้างหน้าคำนวนณพื้นที่สี่เหลี่ยม

app.get('/rectangle', (req,res) => {
    res.render('rectangle.html')    
})

app.post('/rectangle',body, (req,res) => {
    var area = req.body.data['width'] * req.body.data['height']
    res.send('Area is '+area)   
})

// สร้างหน้า upload ไฟล์

var multer = require('multer')
var writer = multer({dest:'photo'})
var fs = require('fs')

app.get('/upload', (req,res) => {   
    res.render('upload.html')    
})

app.post('/upload',writer.single('photo'), (req,res) => {
    fs.renameSync(req.file.path, 'photo/user-'+55634+'.jpg',() => {})
    res.redirect('/')
})

//Upload multiple picture
app.get('/album', (req,res) => {   
    res.render('album.html')    
})

app.post('/album',writer.array('album'), (req,res) => {
    var i=0
    for (var f of req.files){
        fs.rename(f.path,'photo/celebrity-'+ i +'.jpg')
        i=i+1
    }
    res.redirect('/')
})


var data = [ {name:'Latte',price:80},
{name:'Mocha',price:90},
{name:'Americano',price:70},]
//ให้เรียงข้อมูลตามราคาสินค้า น้อยไปมาก
data.sort(compare)
function compare(x,y){
    if (x.price < y.price) return -1 // x มาก่อน
    if (x.price > y.price) return +1 // x มาทีหลัง
    return 0 // x หรือ y มาก่อนก็ได้
    // หรือถ้าขี้เกียจ มีอีกวิธี return x.price - y.price
}

/* ถ้าใช้ arrow function
data.sort( (x,y) => x.price - y.price )
*/

for (var e of data){
    console.log(e.name+' '+e.price)
}