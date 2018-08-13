const isMale = (user) => user.gender === 'male'
const startsWithAToM = (str) => str[0] <= 'm'

const jsonToData = (json) =>{
    const data = typeof json === 'string'? JSON.parse(json).results : json.results
    const stats = {
        numberOfMales:0,
        numberOfFemales:0,
        totalCount:0,
        numFirstNamesAToM:0,
        numFirstNamesNToZ:0,
        numLastNamesAToM:0,
        numLastNamesNToZ:0,
        statesByPeople:{},
        statesByMales:{},
        statesByFemales:{},
        ages:new Array(6).fill(0)
    }
    const addToAges = (num) =>{
        let category = ~~((num - 1)/ 20)
        if(category > 5){
            category = 5
        }
        stats.ages[category]++
    }
    const addToState = (obj, state)=>{
        if(obj[state]){
            obj[state]++
        }else{
            obj[state] = 1
        }
    }
    data.forEach(user=>{
        stats.totalCount++
        if(startsWithAToM(user.name.first)){
            stats.numFirstNamesAToM++
        }else{
            stats.numFirstNamesNToZ++
        }
        if(startsWithAToM(user.name.last)){
            stats.numLastNamesAToM++
        }else{
            stats.numLastNamesNToZ++
        }
        addToAges(user.dob.age)
        let state = user.location.state
        addToState(stats.statesByPeople, state)

        if(isMale(user)){
            stats.numberOfMales++
            addToState(stats.statesByMales, state)
        }else{
            stats.numberOfFemales++
            addToState(stats.statesByFemales, state)
        }
    })

    return stats
}

const toPercent = (a, b) => {
    let result = ((a / b) * 100)
    if (!Number.isInteger(result)) {
        result = +result.toFixed(1)
    }
    return result
}
const getTenMostPopulous = (obj, total) => Object.keys(obj)
    .map(state => ({
        population: toPercent(obj[state], total),
        name: state
    }))
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)

const statsToPercents = statsObj =>{
    const ageRanges = ['0‐20',  '21‐40',  '41‐60',  '61‐80',  '81‐100', '100+']
    // const femaleToMalePercentage = toPercent(statsObj.numberOfFemales, statsObj.numberOfMales)
    // const firstNameAMvsNZpercentage = toPercent(statsObj.numFirstNamesAToM, statsObj.numFirstNamesNToZ)
    // const lastNameAMvsNZpercentage = toPercent(statsObj.numLastNamesAToM, statsObj.numLastNamesNToZ)
    const statePopulationPercentArr = getTenMostPopulous(statsObj.statesByPeople, statsObj.totalCount)
    const stateMalePopulationPercentArr = getTenMostPopulous(statsObj.statesByMales, statsObj.numberOfMales)
    const stateFemalePopulationPercentArr = getTenMostPopulous(statsObj.statesByFemales, statsObj.numberOfFemales)
    const agePercentages = statsObj.ages.map((num, i, arr) => ({
        percentage: toPercent(num, statsObj.totalCount),
        range: ageRanges[i],
        raw: arr[i]
    }))
    const percentMale = toPercent(statsObj.numberOfMales, statsObj.totalCount)
    const percentFemale = toPercent(statsObj.numberOfFemales, statsObj.totalCount)
    const percentFirstNameAM = toPercent(statsObj.numFirstNamesAToM, statsObj.totalCount)
    const percentFirstNameNZ = toPercent(statsObj.numFirstNamesNToZ, statsObj.totalCount)
    const percentLastNameAM = toPercent(statsObj.numLastNamesAToM, statsObj.totalCount)
    const percentLastNameNZ = toPercent(statsObj.numLastNamesNToZ, statsObj.totalCount)
    
    return {
        percentMale,
        percentFemale,
        percentFirstNameAM,
        percentFirstNameNZ,
        percentLastNameAM,
        percentLastNameNZ,
        // femaleToMalePercentage,
        // firstNameAMvsNZpercentage,
        // lastNameAMvsNZpercentage,
        statePopulationPercentArr,
        stateMalePopulationPercentArr,
        stateFemalePopulationPercentArr,
        agePercentages,
    }
}


module.exports = {
    jsonToData,
    statsToPercents
}