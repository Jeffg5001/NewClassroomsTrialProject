const  {jsonToData} = require('./utils');

const  {expect} = require('chai');

describe('function jsonToData', ()=>{
    let testData = '{"results":[{"gender":"female","name":{"title":"ms","first":"pihla","last":"lampo"},"location":{"street":"508 mechelininkatu","city":"savonlinna","state":"northern ostrobothnia","postcode":45215,"coordinates":{"latitude":"-9.7930","longitude":"138.6487"},"timezone":{"offset":"-3:30","description":"Newfoundland"}},"email":"pihla.lampo@example.com","login":{"uuid":"c7e506c6-654b-4460-a237-4511e900d879","username":"lazyfish413","password":"cabbage","salt":"vsSsyc6k","md5":"6ce55155db75384e1e0d2aeb553b6324","sha1":"2c2fb7a1a7b4a73a061176d5a614e7d8adf9e8eb","sha256":"42fb73f0e0836e1629187096941d7a03170aae992504000374fd09abbb89265b"},"dob":{"date":"1949-04-28T07:59:41Z","age":69},"registered":{"date":"2003-05-28T04:16:21Z","age":15},"phone":"06-008-545","cell":"041-299-40-05","id":{"name":"HETU","value":"NaNNA318undefined"},"picture":{"large":"https://randomuser.me/api/portraits/women/90.jpg","medium":"https://randomuser.me/api/portraits/med/women/90.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/90.jpg"},"nat":"FI"},{"gender":"female","name":{"title":"miss","first":"josefine","last":"thomsen"},"location":{"street":"5318 valmuemarken","city":"nr åby","state":"syddanmark","postcode":92607,"coordinates":{"latitude":"-63.2427","longitude":"-77.7147"},"timezone":{"offset":"+5:30","description":"Bombay, Calcutta, Madras, New Delhi"}},"email":"josefine.thomsen@example.com","login":{"uuid":"ff610951-d496-4f4b-8e8e-e237889394c7","username":"silverladybug954","password":"damien","salt":"ioBIFLlK","md5":"6df73c5d2002e6d3cff7b345dc447ebc","sha1":"888bc8fc3a7e5da8c5e4bfd37d03498d8286a065","sha256":"5dd8ef6ba30d2885faf66995c682cb526da96d28dbfdb2f3990b1af9c8d1c9df"},"dob":{"date":"1961-08-14T11:43:35Z","age":56},"registered":{"date":"2005-07-09T16:42:37Z","age":13},"phone":"62092428","cell":"56744610","id":{"name":"CPR","value":"577280-2132"},"picture":{"large":"https://randomuser.me/api/portraits/women/2.jpg","medium":"https://randomuser.me/api/portraits/med/women/2.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/2.jpg"},"nat":"DK"},{"gender":"male","name":{"title":"mr","first":"geerten","last":"van dinter"},"location":{"street":"5851 van asch van wijckskade","city":"krimpenerwaard","state":"zuid-holland","postcode":61743,"coordinates":{"latitude":"80.8478","longitude":"-64.3555"},"timezone":{"offset":"-11:00","description":"Midway Island, Samoa"}},"email":"geerten.vandinter@example.com","login":{"uuid":"30b31f46-4d99-4b67-a218-cb4d14353c34","username":"happyladybug823","password":"bruce1","salt":"uSGk67lo","md5":"6318b6af49bc4b2982249564cec0d4c9","sha1":"3cf4937c07e827357246a7ecc5220d3dbde2c22f","sha256":"4254354496358e1fb2ff0ca0c871fce007d460636ed815e7658f7229eb6de9a2"},"dob":{"date":"1958-06-09T01:54:33Z","age":60},"registered":{"date":"2006-09-09T06:46:41Z","age":11},"phone":"(727)-059-6139","cell":"(063)-417-9441","id":{"name":"BSN","value":"34625050"},"picture":{"large":"https://randomuser.me/api/portraits/men/0.jpg","medium":"https://randomuser.me/api/portraits/med/men/0.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/0.jpg"},"nat":"NL"},{"gender":"male","name":{"title":"monsieur","first":"hubert","last":"guillaume"},"location":{"street":"4902 rue duguesclin","city":"venthône","state":"schwyz","postcode":6799,"coordinates":{"latitude":"55.0470","longitude":"-160.2734"},"timezone":{"offset":"+2:00","description":"Kaliningrad, South Africa"}},"email":"hubert.guillaume@example.com","login":{"uuid":"9d7f95b8-2ef2-4326-bc44-0c3c09fa35e1","username":"bigtiger322","password":"grandma","salt":"u79HzU4I","md5":"a7d96f889c32a3826b28c4ddc12b4a22","sha1":"a4f7c223d5a24aca71b0c93b3f2e02cdcc9f8448","sha256":"fe0426b2ae78c2b09a7db1d184fdd0907f7aa5342cf240bbb7e8964cabb40a24"},"dob":{"date":"1984-02-15T14:02:27Z","age":34},"registered":{"date":"2015-11-10T12:49:23Z","age":2},"phone":"(404)-538-5118","cell":"(324)-942-9960","id":{"name":"AVS","value":"756.7079.2343.18"},"picture":{"large":"https://randomuser.me/api/portraits/men/68.jpg","medium":"https://randomuser.me/api/portraits/med/men/68.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/68.jpg"},"nat":"CH"},{"gender":"male","name":{"title":"mr","first":"marius","last":"rasmussen"},"location":{"street":"5242 irisvej","city":"aalborg s.ø.","state":"syddanmark","postcode":23212,"coordinates":{"latitude":"30.5154","longitude":"-64.2492"},"timezone":{"offset":"-10:00","description":"Hawaii"}},"email":"marius.rasmussen@example.com","login":{"uuid":"62ce6715-7a39-4081-b766-87dea15ff86b","username":"lazyelephant250","password":"cwoui","salt":"HWPTwjsS","md5":"3251a76d0ba70f5b73d8ec12424e049a","sha1":"b68dc8c0d489c3885473e378af6e2b6ef86657a1","sha256":"fe59a098befa0561f74c30d3ef3c7c16a4929976b882b2a7046cbe40307cad67"},"dob":{"date":"1978-10-03T07:48:21Z","age":39},"registered":{"date":"2006-11-10T11:16:53Z","age":11},"phone":"87902132","cell":"26464984","id":{"name":"CPR","value":"395910-8838"},"picture":{"large":"https://randomuser.me/api/portraits/men/42.jpg","medium":"https://randomuser.me/api/portraits/med/men/42.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/42.jpg"},"nat":"DK"}],"info":{"seed":"06c3fd08b90134a0","results":5,"page":1,"version":"1.2"}}'
    let stats = jsonToData(testData)
    it('returns an object containing correct number of males and females',()=>{
        expect(stats.numberOfMales).to.equal(3)
        expect(stats.numberOfFemales).to.equal(2)
    })
    it('returns an object containing number of first names starting with letters in the first and last halves of the alphabet',()=>{
        expect(stats.numFirstNamesAToM).to.equal(4)
        expect(stats.numFirstNamesNToZ).to.equal(1)
    })
    it('returns an object containing number of last names starting with letters in the first and last halves of the alphabet',()=>{
        expect(stats.numLastNamesAToM).to.equal(2)
        expect(stats.numLastNamesNToZ).to.equal(3)
    })
    it('returns an object containing total number of people',()=>{
        expect(stats.totalCount).to.equal(5)
    })
    it('returns an object containing an object of at most 10 states as keys and number of people in that state as values',()=>{
        expect(stats.statesByPeople).to.deep.equal({
            "syddanmark":2,
            "northern ostrobothnia":1,
            "zuid-holland":1,
            "schwyz":1
        })
    })
    it('returns an object containing an object of at most 10 states as keys and number of males in that state as values',()=>{
        expect(stats.statesByMales).to.deep.equal({
            "syddanmark":1,
            "zuid-holland":1,
            "schwyz":1
        })
    })
    it('returns an object containing an object of at most 10 states as keys and number of females in that state as values',()=>{
        expect(stats.statesByFemales).to.deep.equal({
            "syddanmark":1,
            "northern ostrobothnia":1
        })
    })
    it('returns an object containing an array where each index is the number of people in the age ranges 0‐20, 21‐40, 41‐60, 61‐80, 81‐100, 100+',()=>{
        expect(stats.ages).to.deep.equal([0,2,2,1,0,0])
    })

    
})