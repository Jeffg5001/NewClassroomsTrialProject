const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { jsonToData, statsToPercents } = require('../utils');
const fs = require('fs')
const xml2js = require('xml2js')
const builder = new xml2js.Builder()
const path = require('path')



app.listen(process.env.PORT || 3000)

app.use(bodyParser.json())

app.use(express.static('public'))

//example usage POST to localhost:3000/percentages?filetype=xml  body:JSON file from https://randomuser.me/
app.post('/percentages', (req, res, next) => {
    const userData = req.body
    try {
        const stats = jsonToData(userData)
        let extension = req.query.filetype
        const bestMatch = req.accepts(['json','txt','xml'])
        const {
            statePopulationPercentArr,
            stateMalePopulationPercentArr,
            stateFemalePopulationPercentArr,
            agePercentages,
            percentMale,
            percentFemale,
            percentFirstNameAM,
            percentFirstNameNZ,
            percentLastNameAM,
            percentLastNameNZ
        } = jsonObj = statsToPercents(stats)
        if(extension !== 'json' && extension !== 'txt' && extension !== 'xml'){
            extension = bestMatch
        }
        console.log(extension)
        switch (extension) {
            case 'json':
                fs.writeFileSync('./userStatistics.' + extension, JSON.stringify(jsonObj))
                break
            case 'txt':
                let data = '';
                data += `Percentage Female: ${percentFemale}%\nPercentage Male: ${percentMale}%\nPercentage of first names that start with A‐M: ${percentFirstNameAM}%\nPercentage of first names that start with N-Z: ${percentFirstNameNZ}%\nPercentage of last names that start with A‐M: ${percentLastNameAM}%\nPercentage of last names that start with N-Z: ${percentLastNameNZ}%\n`

                function addPopulations(type, arr) {
                    data += `Percentages of ${type} in the ${arr.length} most populous states:\n`
                    arr.forEach(state => {
                        data += `    ${state.name}: ${state.population}%\n`
                    })
                }
                addPopulations('people', statePopulationPercentArr)
                addPopulations('males', stateMalePopulationPercentArr)
                addPopulations('females', stateFemalePopulationPercentArr)
                data += 'Percentage of people in the following age ranges:\n'
                agePercentages.forEach(age => {
                    data += `    ${age.range}: ${age.percentage}%\n`
                })
                fs.writeFileSync('./userStatistics.' + extension, data)
                break
            case 'xml':
                let xmlFormatting = {
                    genderDistribution:{
                        percentMale:percentMale,
                        percentFemale:percentFemale
                    },
                    firstNameAMvsNZpercentages:{
                        "A-M":percentFirstNameAM,
                        "N-Z":percentFirstNameNZ
                    },
                    lastNameAMvsNZpercentages:{
                        "A-M":percentLastNameAM,
                        "N-Z":percentLastNameNZ
                    },
                    statePopulationPercents: {
                        people: Object.assign({}, ...statePopulationPercentArr.map(obj => {
                            let name = obj.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join('')
                            return {
                                [name]: obj.population
                            }
                        })),
                        males: Object.assign({}, ...stateMalePopulationPercentArr.map(obj => {
                            let name = obj.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join('')
                            return {
                                [name]: obj.population
                            }
                        })),
                        females: Object.assign({}, ...stateFemalePopulationPercentArr.map(obj => {
                            let name = obj.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join('')
                            return {
                                [name]: obj.population
                            }
                        })),
                    },
                    ageDistribution: Object.assign({}, ...agePercentages.slice(0, -1).map(obj => ({
                        ['range' + obj.range]: obj.percentage
                    })), {
                        rangeOver100: agePercentages[agePercentages.length - 1].percentage
                    })
                }

                let xml = builder.buildObject(xmlFormatting)
                fs.writeFileSync('./userStatistics.' + extension, xml)
                break
            default:
                res.status(415).send('unsupported file type requested, please only use: json, txt, or xml')
                return
        }
        res.type(extension)
        fs.createReadStream('./userStatistics.' + extension).pipe(res);
    } catch (err) {
        console.error(err)
        res.status(415).send('unsupported file type in request body, please only use json')
    }
})

app.get('*',(req,res,next)=>{
    res.sendFile(path.join(__dirname, '..','public', 'index.html'))
})