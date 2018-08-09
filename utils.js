const isMale = (user) => user.gender === 'male'
const startsWithAToM = (str) => str[0] <= 'm'

const jsonToData = (json) =>{
    const data = JSON.parse(json).results
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
module.exports = {
    jsonToData
}