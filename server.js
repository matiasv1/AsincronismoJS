const express = require ('express')
const axios = require ('axios')

const app = express()

async function getConfig(){
    const url = "http://xxxxxxx/api/auth/login"
    const data = {"username":"", "password":""}
    const response = await axios.post(url,data)
    const token = response.data.token
    var config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    return config
}

async function getDataSensors(url, atributo){
    var config = await getConfig()
    var response = await axios.get(url,config)
    console.log(response.data)
    return response['data'][atributo]
}

app.get('/sensores_radon', function (req, res){
    var url = "http:///api/plugins/telemetry/DEVICE/723d0580-452d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Radon&startTs=1265046352083&endTs=1665029708303"
    getDataSensors(url,'Radon')
    .then(data => {
        res.send(data)})
    .catch(error => {
        console.log(error)
        response.send(error)
    })
})

app.get('/sensores_multiparametro', function(req,res){
    console.log("Peticion recibida")
    var url = 'http:///api/plugins/telemetry/DEVICE/101d2fe0-454d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=TIMESTAMP,WS,WD,Temp,RH,BP,Depth &startTs=1265046352083&endTs=1665043961492'
    getDataSensors(url,'WD').then (data => res.send(data))
    
})

app.listen(3000)
