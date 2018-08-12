const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { jsonToData, statsToPercents } = require('../utils');
const fs = require('fs')
const xml2js = require('xml2js')
const builder = new xml2js.Builder()



app.listen(3000)

app.use(bodyParser.json())

//example usage POST to localhost:3000/percentages?filetype=xml  body:JSON file from https://randomuser.me/
app.post('/percentages', (req, res, next) => {
    const userData = req.body
    try {
        const stats = jsonToData(userData)
        const extension = req.query.filetype
        const {
            femaleToMalePercentage,
            firstNameAMvsNZpercentage,
            lastNameAMvsNZpercentage,
            statePopulationPercentArr,
            stateMalePopulationPercentArr,
            stateFemalePopulationPercentArr,
            agePercentages
        } = jsonObj = statsToPercents(stats)
        
        switch (extension) {
            case 'json':
                fs.writeFileSync('./userStatistics.' + extension, JSON.stringify(jsonObj))
                break
            case 'txt':
                let data = '';
                data += `Percentage female versus male: ${femaleToMalePercentage}%\nPercentage of first names that start with A‐M versus N‐Z: ${firstNameAMvsNZpercentage}%\nPercentage of last names that start with A‐M versus N‐Z: ${lastNameAMvsNZpercentage}%\n`

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
                    femaleToMalePercentage,
                    firstNameAMvsNZpercentage,
                    lastNameAMvsNZpercentage,
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